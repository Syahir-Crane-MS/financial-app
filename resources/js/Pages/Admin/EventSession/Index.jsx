import { useState, useEffect } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import ModalFlexible from "@/Components/ModalFlexible";

import { Head, usePage, router, useForm } from "@inertiajs/react";

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
    Switch,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { initial } from "lodash";

export default function Index({ events }) {
    const title = "Event Session";

    const { eventStatus } = useUserStore();

    const [event, setEvent] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        setEvent(events);
    }, [events]);

    const { data, setData, post, put, processing, reset, errors, clearErrors } =
        useForm({
            title: "",
            active: "",
            passcode: "",
            initial_salary: "",
        });

    const flexFields = [
        {
            name: "title",
            label: "Title",
            component: "text",
            sx: { width: "100%" },
        },
        {
            name: "active",
            label: "Active",
            component: "select",
            menuItem: eventStatus,
            sx: { width: "48%" },
        },
        {
            name: "passcode",
            label: "Passcode",
            component: "text",
            sx: { width: "48%" },
        },
        {
            name: "initial_salary",
            label: "Initial Salary",
            component: "text",
            sx: { width: "48%" },
        },
    ];

    const rows = event?.map((data) => ({
        id: data.id,
        title: data.title,
        active: data.active,
        passcode: data.passcode,
        initial_salary: data.initial_salary,
        salary_format: new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(data.initial_salary),
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
            field: "salary_format",
            headerName: "Initial salary",
            width: 200,
        },
        {
            field: "passcode",
            headerName: "Passcode",
            width: 150,
        },
        {
            field: "active",
            headerName: "Active",
            width: 150,
            renderCell: (params) => {
                const isChecked =
                    params.value === "true" || params.value === true;
                const rowId = params.row.id;

                const handleToggle = (event) => {
                    const newStatus = event.target.checked ? "true" : "false";

                    router.post(
                        route("event.updateStatus", rowId),
                        {
                            active: newStatus,
                        },
                        {
                            preserveScroll: true,
                        },
                    );
                };

                return (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Switch
                            checked={isChecked}
                            onChange={handleToggle}
                            size="small"
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "#36c0a4",
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                    {
                                        backgroundColor: "#36c0a4",
                                    },
                            }}
                        />
                    </Box>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
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
                        component={"a"}
                        href={route("event.participants", [params.row.id])}
                        sx={{
                            bgcolor: "#5e5e5e",
                            borderRadius: "5px",
                            height: "30px",
                            width: "30px",
                        }}
                    >
                        <PersonIcon sx={{ color: "white", fontSize: "16px" }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editMode && selectedId) {
            post(
                route("event.update", {
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
            post(route("event.create"), {
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
        post(route("event.delete", [row]), {});
    };

    const handleEdit = (row) => {
        setEditMode(true);

        setSelectedId(row.id);

        setData({
            id: row.id || "",
            title: row.title || "",
            active: row.active || "",
            passcode: row.passcode || "",
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
                        <Button
                            sx={{ bgcolor: "#36c0a4" }}
                            onClick={handleOpenCreate}
                        >
                            <Typography
                                sx={{ color: "white", fontSize: "12px" }}
                            >
                                Add Event
                            </Typography>
                        </Button>
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
                title="Event"
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
        </AuthenticatedLayout>
    );
}
