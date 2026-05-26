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

export default function Index({ learnings }) {
    const title = "Learning";

    const { learning_type, learning_category } = useUserStore();

    const [openDialog, setOpenDialong] = useState(false);
    const [qrUUID, setQrUUID] = useState("");

    const [learning, setLearning] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        setLearning(learnings);
    }, [learnings]);

    const { data, setData, post, put, processing, reset, errors, clearErrors } =
        useForm({
            title: "",
            type: "",
            description: "",
            upfront_cost: "",
            impact: "",
            life_score: "",
            energy_score: "",
            pre_requisite: "",
            category: "",
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
            menuItem: learning_type,
            sx: { width: "48%" },
        },
        {
            name: "description",
            label: "Description",
            component: "textArea",
            sx: { width: "100%" },
        },
        {
            name: "upfront_cost",
            label: "Upfront Cost",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "impact",
            label: "Impact",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "life_score",
            label: "Life Score",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "energy_score",
            label: "Energy Score",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "pre_requisite",
            label: "Prerequisite",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "category",
            label: "Category",
            component: "select",
            menuItem: learning_category,
            sx: { width: "48%" },
        },
    ];

    const typeLabel = (data) => {
        const found = learning_type.find((item) => item.value === data);

        return found ? found.label : "Unknown";
    };

    const categoryLabel = (data) => {
        const found = learning_category.find((item) => item.value === data);

        return found ? found.label : "Unknown";
    };

    const rows = learning?.map((data) => ({
        uuid: data.uuid,
        id: data.id,
        title: data.title,
        type: data.type,
        type_label: typeLabel(data.type),
        description: data.description,
        upfront_cost: data.upfront_cost,
        impact: data.impact,
        life_score: data.life_score,
        energy_score: data.energy_score,
        pre_requisite: data.pre_requisite,
        category: data.category,
        category_label: categoryLabel(data.category),
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
            width: 200,
        },
        {
            field: "type_label",
            headerName: "Type",
            width: 120,
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
        },
        {
            field: "upfront_cost",
            headerName: "Upfront Cost",
            width: 120,
        },
        {
            field: "impact",
            headerName: "Impact",
            width: 120,
        },
        {
            field: "life_score",
            headerName: "Life Score",
            width: 120,
        },
        {
            field: "energy_score",
            headerName: "Energy Score",
            width: 120,
        },
        {
            field: "pre_requisite",
            headerName: "Prerequisite",
            width: 120,
        },
        {
            field: "category_label",
            headerName: "Category",
            width: 120,
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
                route("learning.update", {
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
            post(route("learning.create"), {
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
        post(route("learning.delete", [row]), {});
    };

    const handleEdit = (row) => {
        setEditMode(true);

        setSelectedId(row.id);

        setData({
            id: row.id || "",
            title: row.title || "",
            type: row.type || "",
            description: row.description || "",
            upfront_cost: row.upfront_cost || "",
            impact: row.impact || "",
            life_score: row.life_score || "",
            energy_score: row.energy_score || "",
            pre_requisite: row.pre_requisite || "",
            category: row.category || "",
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
                                href={route("public.learning")}
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
                                    Add Learning
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
                title="Learning"
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
