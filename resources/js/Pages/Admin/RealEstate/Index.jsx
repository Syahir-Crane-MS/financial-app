import { useState, useEffect } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import ModalFlexible from "@/Components/ModalFlexible";

import { Head, useForm } from "@inertiajs/react";

import { useUserStore } from "@/Pages/Store/useUserStore";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Breadcrumbs,
    Link,
    Button,
    IconButton,
    Dialog,
    DialogContent,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PublicIcon from "@mui/icons-material/Public";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { QRCodeSVG } from "qrcode.react";

export default function Index({ realestates }) {
    const title = "Real Estate";

    const { real_estate_type, real_estate_category } = useUserStore();

    const [openDialog, setOpenDialong] = useState(false);
    const [qrUUID, setQrUUID] = useState("");

    const [realestate, setRealestate] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        setRealestate(realestates);
    }, [realestates]);

    const { data, setData, post, put, processing, reset, errors, clearErrors } =
        useForm({
            title: "",
            type: "",
            market_value: "",
            down_payment: "",
            loan: "",
            monthly_cf: "",
            selling_price: "",
            est_cash_out: "",
            category: "",
            description: "",
        });

    const flexFields = [
        {
            name: "title",
            label: "Title",
            component: "text",
            sx: { width: "100%" },
        },
        {
            name: "type",
            label: "Type",
            component: "select",
            menuItem: real_estate_type,
            sx: { width: "48%" },
        },
        {
            name: "market_value",
            label: "Market Value",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "down_payment",
            label: "Down Payment",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "loan",
            label: "Loan Amount",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "monthly_cf",
            label: "Monthly CF",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "selling_price",
            label: "Selling Price",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "est_cash_out",
            label: "Est. Cash Out",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "category",
            label: "Category",
            component: "select",
            menuItem: real_estate_category,
            sx: { width: "48%" },
        },
        {
            name: "description",
            label: "description",
            component: "textArea",
            sx: { width: "100%" },
        },
    ];

    const typeLabel = (data) => {
        const found = real_estate_type.find((item) => item.value === data);

        return found ? found.label : "Unknown";
    };

    const categoryLabel = (data) => {
        const found = real_estate_category.find((item) => item.value === data);

        return found ? found.label : "Unknown";
    };

    const rows = realestate?.map((data) => ({
        uuid: data.uuid,
        id: data.id,
        title: data.title,
        type: data.type,
        type_label: typeLabel(data.type),
        market_value: data.market_value,
        down_payment: data.down_payment,
        loan: data.loan,
        monthly_cf: data.monthly_cf,
        selling_price: data.selling_price,
        est_cash_out: data.est_cash_out,
        category: data.category,
        category_label: categoryLabel(data.category),
        description: data.description,
    }));

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 60,
        },
        {
            field: "title",
            headerName: "Title",
            width: 150,
        },
        {
            field: "type_label",
            headerName: "Type",
            width: 120,
        },
        {
            field: "market_value",
            headerName: "Market Value",
            width: 120,
        },
        {
            field: "down_payment",
            headerName: "Down Payment",
            width: 120,
        },
        {
            field: "loan",
            headerName: "Loan",
            width: 120,
        },
        {
            field: "monthly_cf",
            headerName: "Monthly CF",
            width: 120,
        },
        {
            field: "selling_price",
            headerName: "Selling Price",
            width: 120,
        },
        {
            field: "est_cash_out",
            headerName: "Est. Cash Out",
            width: 120,
        },
        {
            field: "category_label",
            headerName: "Category",
            width: 120,
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
        },
        {
            field: "action",
            headerName: "Action",
            width: 160,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        gap: 1,
                    }}
                >
                    <IconButton
                        sx={{
                            bgcolor: "#5e5e5e",
                            borderRadius: "5px",
                            height: "30px",
                            width: "30px",
                        }}
                        onClick={() => handleDialogOpen(params.row.uuid)}
                    >
                        <QrCodeIcon sx={{ color: "white", fontSize: "16px" }} />
                    </IconButton>

                    <IconButton
                        sx={{
                            bgcolor: "#5e5e5e",
                            borderRadius: "5px",
                            height: "30px",
                            width: "30px",
                        }}
                        onClick={() => handleEdit(params.row)}
                    >
                        <EditIcon sx={{ color: "white", fontSize: "16px" }} />
                    </IconButton>

                    <IconButton
                        sx={{
                            bgcolor: "#5e5e5e",
                            borderRadius: "5px",
                            height: "30px",
                            width: "30px",
                        }}
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon sx={{ color: "white", fontSize: "16px" }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editMode && selectedId) {
            post(
                route("realestate.update", {
                    id: selectedId,
                }),
                {
                    onSuccess: () => {
                        setOpen(false);
                        reset();
                        setEditMode(false);
                        setSelectedId(null);
                    },
                },
            );
        } else {
            post(route("realestate.create"), {
                onSuccess: () => {
                    setOpen(false);
                    reset();
                },
            });
        }
    };

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    const handleOpenCreate = () => {
        reset();
        setEditMode(false);
        setOpen(true);
    };

    const handleDelete = (row) => {
        post(route("realestate.delete", [row]), {});
    };

    const handleEdit = (row) => {
        setEditMode(true);

        setSelectedId(row.id);

        setData({
            id: row.id || "",
            title: row.title || "",
            type: row.type || "",
            market_value: row.market_value || "",
            down_payment: row.down_payment || "",
            loan: row.loan || "",
            monthly_cf: row.monthly_cf || "",
            selling_price: row.selling_price || "",
            est_cash_out: row.est_cash_out || "",
            category: row.category || "",
            description: row.description || "",
        });

        setOpen(true);
    };

    const handleDialogOpen = (data) => {
        setQrUUID(data);
        setOpenDialong(true);
    };

    const handleDialogClose = () => {
        setOpenDialong(false);
        setQrUUID("");
    };

    return (
        <AuthenticatedLayout
            header={title}
            breadcrumbs={
                <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{ lineHeight: 1, fontSize: "11px" }}
                >
                    <Link
                        underline="hover"
                        href="/dashboard"
                        sx={{ fontSize: "11px", color: "#36c0a4" }}
                    >
                        Dashboard
                    </Link>
                    <Typography
                        sx={{
                            fontSize: "11px",
                            lineHeight: 1,
                            fontWeight: 600,
                        }}
                    >
                        {title}
                    </Typography>
                </Breadcrumbs>
            }
        >
            <Head title={title} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Card
                    sx={{
                        boxShadow: 0,
                        borderRadius: "10px",
                        bgcolor: "white",
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            ":last-child": { pb: 2 },
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "18px",
                                color: "#353d3a",
                                fontWeight: 600,
                                lineHeight: 1,
                            }}
                        >
                            {title}
                        </Typography>
                        <Box>
                            <IconButton
                                component={"a"}
                                href={route("public.realestate")}
                                target="_blank"
                            >
                                <PublicIcon />
                            </IconButton>
                            <Button
                                sx={{ bgcolor: "#36c0a4" }}
                                onClick={handleOpenCreate}
                            >
                                <AddIcon
                                    sx={{ color: "white", fontSize: "16px" }}
                                />
                                <Typography
                                    sx={{ color: "white", fontSize: "12px" }}
                                >
                                    Add Real Estate
                                </Typography>
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        boxShadow: 0,
                        borderRadius: "10px",
                        bgcolor: "white",
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            ":last-child": { pb: 2 },
                            alignItems: "center",
                        }}
                    >
                        <DataGrid
                            sx={{
                                minHeight: 300,
                                border: "none",
                                "& .MuiDataGrid-columnHeaderTitle": {
                                    fontSize: "12px",
                                    fontWeight: 500,
                                },
                                "& .MuiDataGrid-cell": {
                                    fontSize: "12px",
                                    color: "#4a4a4a",
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-root":
                                    {
                                        color: "#36c0a4",
                                    },
                                bgcolor: "white",
                                p: 2,
                            }}
                            rows={rows}
                            columns={columns}
                            disableSelectionOnClick
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                    csvOptions: { disableToolbarButton: true },
                                    printOptions: {
                                        disableToolbarButton: true,
                                    },
                                },
                            }}
                            pageSizeOptions={[20, 50, 100]}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        page: 0,
                                        pageSize: 20,
                                    },
                                },
                            }}
                        />
                    </CardContent>
                </Card>
            </Box>

            <ModalFlexible
                title={title}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                processing={processing}
                data={data}
                setData={setData}
                editMode={editMode}
                errors={errors}
                clearErrors={clearErrors}
                fields={flexFields}
            />

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogContent>
                    <QRCodeSVG
                        value={qrUUID}
                        size={200}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"H"}
                        includeMargin={false}
                    />
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
