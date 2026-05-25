import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

import ModalFlexible from "@/Components/ModalFlexible";

import { useState, useEffect } from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Dialog,
    DialogContent,
    Breadcrumbs,
    Link,
    Button,
    IconButton,
} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCodeIcon from "@mui/icons-material/QrCode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PublicIcon from "@mui/icons-material/Public";

import { QRCodeSVG } from "qrcode.react";

export default function Index({ funds }) {
    const title = "Index Fund Market";

    const [fund, setFund] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [openDialog, setOpenDialong] = useState(false);
    const [qrUUID, setQrUUID] = useState("");

    useEffect(() => {
        setFund(funds);
    }, [funds]);

    const { data, setData, post, put, processing, reset, errors, clearErrors } =
        useForm({
            title: "",
            current_fund_price: "",
        });

    const flexFields = [
        {
            name: "title",
            label: "Title",
            component: "text",
            sx: { width: "100%" },
        },
        {
            name: "current_fund_price",
            label: "Fund Price",
            component: "text",
            sx: { width: "100%" },
        },
    ];

    const rows = fund?.map((data) => ({
        uuid: data.uuid,
        id: data.id,
        title: data.title,
        current_fund_price: data.current_fund_price,
        fund_format: new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(data.current_fund_price),
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
            width: 300,
        },
        {
            field: "fund_format",
            headerName: "Fund Price",
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
                        component={"a"}
                        href={route("fund.view", [params.row.id])}
                        sx={{
                            bgcolor: "#5e5e5e",
                            borderRadius: "5px",
                            height: "30px",
                            width: "30px",
                        }}
                    >
                        <VisibilityIcon
                            sx={{ color: "white", fontSize: "16px" }}
                        />
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
                route("fund.update", {
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
            post(route("fund.create"), {
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
        post(route("fund.delete", [row]), {});
    };

    const handleEdit = (row) => {
        setEditMode(true);

        setSelectedId(row.id);

        setData({
            id: row.id || "",
            title: row.title || "",
            current_fund_price: row.current_fund_price || "",
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
                                href={route("public.fund")}
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
                                    Add Fund
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
                title="Index Fund Stock"
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
