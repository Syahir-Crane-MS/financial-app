import { useState, useEffect } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, router } from "@inertiajs/react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Breadcrumbs,
    Link,
    Button,
    IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Participants({ event, participants }) {
    const title = event.title;

    const [participant, setParticipant] = useState([]);

    useEffect(() => {
        setParticipant(participants);
    }, [participants]);

    const handleReset = () => {
        const confirmReset = window.confirm(
            "Are you sure to reset this event?",
        );

        if (confirmReset) {
            // Hantar request DELETE menggunakan Inertia Router
            router.delete(route("event.reset", { id: event.id }), {
                onStart: () => console.log("Resetting event..."),
                onSuccess: () => {
                    alert("Event successfully reset!");
                },
                onError: (errors) => {
                    alert(errors.error || "Something went wrong.");
                },
            });
        }
    };

    const rows = participant?.map((data) => ({
        id: data.id,
        event_id: event.id,
        session_id: data.session_id,
        name: data.name,
        email: data.email,
    }));

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 60,
        },
        {
            field: "name",
            headerName: "Name",
            width: 300,
        },
        {
            field: "email",
            headerName: "Email",
            width: 300,
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
                        href={route("event.participantSession", {
                            id: params.row.event_id,
                            pid: params.row.id,
                            sid: params.row.session_id,
                        })}
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
                </Box>
            ),
        },
    ];

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
                    <Link
                        underline="hover"
                        href="/event"
                        sx={{ fontSize: "11px", color: "#36c0a4" }}
                    >
                        Event
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
                        }}
                    >
                        <Box>
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
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#353d3a",
                                    fontWeight: 300,
                                    lineHeight: 1.3,
                                }}
                            >
                                Participant list
                            </Typography>
                        </Box>
                        <Button
                            sx={{ bgcolor: "#36c0a4" }}
                            onClick={handleReset}
                        >
                            <Typography
                                sx={{ color: "white", fontSize: "12px" }}
                            >
                                Reset Participant
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
        </AuthenticatedLayout>
    );
}
