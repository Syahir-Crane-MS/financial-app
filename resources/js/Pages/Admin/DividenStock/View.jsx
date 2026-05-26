import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

import { useState, useEffect } from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Breadcrumbs,
    Link,
    Button,
} from "@mui/material";

import LoopIcon from "@mui/icons-material/Loop";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function View({ stocks, lists }) {
    const title = stocks.title;

    const [list, setList] = useState([]);

    useEffect(() => {
        setList(lists);
    }, [lists]);

    const rows = list?.map((data, index) => ({
        id: data.id,
        index: index + 1,
        direction: data.direction,
        magnitude: data.magnitude,
    }));

    const columns = [
        {
            field: "index",
            headerName: "No.",
            width: 60,
        },
        {
            field: "direction",
            headerName: "Direction",
            width: 150,
        },
        {
            field: "magnitude",
            headerName: "Magnitude",
            width: 150,
        },
    ];

    const handleGenerate = (e) => {
        e.preventDefault();

        if (confirm("Are You Sure to generate data?")) {
            router.get(`/dividen-stock/generate/${stocks.id}`);
        }
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
                    <Link
                        underline="hover"
                        href="/dividen-stock"
                        sx={{ fontSize: "11px", color: "#36c0a4" }}
                    >
                        Dividen Stock Market
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
                            Dividen Stock Market : {title}
                        </Typography>
                        <Button
                            sx={{ bgcolor: "#36c0a4" }}
                            onClick={handleGenerate}
                        >
                            <LoopIcon
                                sx={{ color: "white", fontSize: "16px" }}
                            />
                            <Typography
                                sx={{ color: "white", fontSize: "12px" }}
                            >
                                Generate Data
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
