import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useState, useEffect } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Link,
    Breadcrumbs,
    IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import _ from "lodash";

import dayjs from "dayjs";

export default function View({ sessions, users }) {
    const title = users.name;
    const [session, setSession] = useState([]);

    useEffect(() => {
        setSession(sessions);
    }, [sessions]);

    const rows = session?.map((data) => ({
        user_id: data.user_id,
        id: data.id,
        event_id: data.event_id,
        event_name: data.event.title,
        initial_salary: new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(data.event.initial_salary),
        created_at: dayjs(data.created_at).format("DD MMMM YYYY, hh:MMA"),
    }));

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 60,
        },
        {
            field: "event_name",
            headerName: "Event Session",
            width: 350,
        },
        {
            field: "initial_salary",
            headerName: "Initial Salary",
            width: 150,
        },
        {
            field: "created_at",
            headerName: "Date",
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
                        component={"a"}
                        href={route("participant.session", {
                            id: params.row.user_id,
                            sid: params.row.id,
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
            header={"Participant " + title}
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
                        href={route("participant.index")}
                        sx={{ fontSize: "11px", color: "#36c0a4" }}
                    >
                        Participant
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
                            flexDirection: "column",
                            ":last-child": { pb: 2 },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "18px",
                                color: "#353d3a",
                                fontWeight: 600,
                                lineHeight: 1.3,
                            }}
                        >
                            {title} ({users.email})
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                color: "#353d3a",
                                fontWeight: 300,
                                lineHeight: 1.3,
                            }}
                        >
                            Participant Details
                        </Typography>
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
