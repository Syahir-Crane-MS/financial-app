import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

import ModalFlexible from "@/Components/ModalFlexible";

import { useState, useEffect } from "react";

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

export default function Index({ insurances }) {
    const title = "Insurance";

    const [openDialog, setOpenDialong] = useState(false);
    const [qrUUID, setQrUUID] = useState("");

    const [insurance, setInsurance] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        setInsurance(insurances);
    }, [insurances]);

    const { data, setData, post, put, processing, reset, errors, clearErrors } =
        useForm({
            title: "",
            description: "",
            monthly_contribution: "",
        });

    const flexFields = [
        {
            name: "title",
            label: "Title",
            component: "text",
            sx: { width: "100%" },
        },
        {
            name: "description",
            label: "description",
            component: "textArea",
            sx: { width: "100%" },
        },
        {
            name: "monthly_contribution",
            label: "Monthly Contribution",
            component: "text",
            sx: { width: "100%" },
        },
    ];

    const handleDialogOpen = (data) => {
        setQrUUID(data);
        setOpenDialong(true);
    };

    const handleDialogClose = () => {
        setOpenDialong(false);
        setQrUUID("");
    };

    const rows = insurance?.map((data) => ({
        uuid: data.uuid,
        id: data.id,
        title: data.title,
        description: data.description,
        monthly_contribution: data.monthly_contribution,
        monthly_format: new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(data.monthly_contribution),
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
            field: "monthly_format",
            headerName: "Monthly Contribution",
            width: 150,
        },
        {
            field: "description",
            headerName: "Description",
            width: 350,
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
                route("insurance.update", {
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
            post(route("insurance.create"), {
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
        post(route("insurance.delete", [row]), {});
    };

    const handleEdit = (row) => {
        setEditMode(true);

        setSelectedId(row.id);

        setData({
            id: row.id || "",
            title: row.title || "",
            monthly_contribution: row.monthly_contribution || "",
            description: row.description || "",
        });

        setOpen(true);
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
                                href={route("public.insurance")}
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
                                    Add Insurance
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
