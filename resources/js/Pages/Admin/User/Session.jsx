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

export default function Session({ session, user, transactions }) {
    const title = user.name;
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        setTransaction(transactions);
    }, [transactions]);

    const color = (data) => {
        if (data == "income") {
            return "#429d0a";
        }
        if (data == "dividen_stock") {
            return "#4ce1e1";
        }
        if (data == "index_fund") {
            return "#f03f6a";
        }
        if (data == "insurance") {
            return "#f18639";
        }
        if (data == "learning") {
            return "#39a1f1";
        }
        if (data == "life") {
            return "#8939f1";
        }
        if (data == "market") {
            return "#5e6870";
        }
        if (data == "real_estate") {
            return "#4f47dc";
        }
    };

    const transaction_title = (data) => {
        if (data.invest_type == "income") {
            return (
                <Typography sx={{ fontSize: "12px" }}>
                    {_.get(data.invest_title, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "dividen_stock") {
            return (
                <Typography sx={{ fontSize: "12px" }}>
                    {_.get(data.invest_title, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "index_fund") {
            return (
                <Typography sx={{ fontSize: "12px" }}>
                    {_.get(data.invest_title, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "insurance") {
            return (
                <Typography sx={{ fontSize: "12px" }}>
                    {_.get(data.invest_title, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "learning") {
            return (
                <Typography sx={{ fontSize: "12px" }}>
                    {_.get(data.invest_title, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "life") {
            return (
                <Typography sx={{ fontSize: "12px" }}>
                    {_.get(data.invest_title, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "market") {
            return (
                <Typography sx={{ fontSize: "12px" }}>
                    {_.get(data.invest_title, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "real_estate") {
            return (
                <Typography sx={{ fontSize: "12px" }}>
                    {_.get(data.invest_title, "title")}
                </Typography>
            );
        }
    };

    const rows = transaction?.map((data) => ({
        id: data.id,
        invest_type: data.invest_type,
        invest_title:
            data.income ||
            data.stock ||
            data.fund ||
            data.insurance ||
            data.learning ||
            data.market ||
            data.realestate,
        created_at: dayjs(data.created_at).format("DD MMM YYYY, hh:MMA"),
    }));

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 60,
        },
        {
            field: "invest_type",
            headerName: "Investment",
            width: 150,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            bgcolor: color(params.row.invest_type),
                            width: "fit-content",
                            color: "white",
                            px: 1,
                            textTransform: "uppercase",
                            borderRadius: "5px",
                            fontSize: "12px",
                        }}
                    >
                        {params.row.invest_type}
                    </Typography>
                </Box>
            ),
        },
        {
            field: "invest_title",
            headerName: "Title",
            width: 300,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                    }}
                >
                    {transaction_title(params.row)}
                </Box>
            ),
        },
        {
            field: "created_at",
            headerName: "Date",
            width: 200,
        },
        // {
        //     field: "action",
        //     headerName: "Action",
        //     width: 160,
        //     renderCell: (params) => (
        //         <Box
        //             sx={{
        //                 display: "flex",
        //                 alignItems: "center",
        //                 height: "100%",
        //                 gap: 1,
        //             }}
        //         >
        //             <IconButton
        //                 component={"a"}
        //                 // href={route("participant.session", {
        //                 //     id: params.row.user_id,
        //                 //     sid: params.row.id,
        //                 // })}
        //                 sx={{
        //                     bgcolor: "#5e5e5e",
        //                     borderRadius: "5px",
        //                     height: "30px",
        //                     width: "30px",
        //                 }}
        //             >
        //                 <VisibilityIcon
        //                     sx={{ color: "white", fontSize: "16px" }}
        //                 />
        //             </IconButton>
        //         </Box>
        //     ),
        // },
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
                    <Link
                        underline="hover"
                        href={route("participant.view", {
                            id: user.id,
                            sid: session.id,
                        })}
                        sx={{ fontSize: "11px", color: "#36c0a4" }}
                    >
                        {title}
                    </Link>
                    <Typography
                        sx={{
                            fontSize: "11px",
                            lineHeight: 1,
                            fontWeight: 600,
                        }}
                    >
                        {session?.event?.title}
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
                            {title} ({user.email})
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                color: "#353d3a",
                                fontWeight: 300,
                                lineHeight: 1.3,
                            }}
                        >
                            Event Session {session?.event?.title}
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
