import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect, useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";

import dayjs from "dayjs";

import { Link, usePage, router, useForm } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export default function Stock({ transactions, session_id }) {
    const title = "Dividen Stock Market";

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(transactions);
    }, [transactions]);

    const cardDividen = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", borderRadius: 1 }}>
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.stock.title}
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Stock Price
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.stock.current_stock_price)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Dividen</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.stock.dividen_per_share)}
                                </b>
                            </td>
                        </tr>
                    </table>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontSize: "14px", color: "gray" }}>
                        <b>Purchased on:</b>{" "}
                        {dayjs(item.created_at).format("DD MMMM YYYY, hh:MMA")}
                    </Typography>
                </Box>
            </Box>
        );
    };

    return (
        <AuthenticatedLayout header={title} breadcrumbs={null}>
            <Head title={title} />

            <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
                <IconButton
                    component="a"
                    href={route("myevent.view", [session_id])}
                    sx={{ bgcolor: "#f0f0f0", borderRadius: "5px" }}
                >
                    <ChevronLeftIcon sx={{ fontSize: "25px" }} />
                    <Typography>Back</Typography>
                </IconButton>

                <IconButton
                    component="a"
                    onClick={() => {
                        router.post(route("logout"));
                    }}
                    sx={{ bgcolor: "#f0f0f0", borderRadius: "5px" }}
                >
                    <PowerSettingsNewIcon sx={{ fontSize: "25px" }} />
                </IconButton>
            </Box>

            <Box
                sx={{
                    mt: 2,
                    mb: 2,
                    bgcolor: "#4ce1e1",
                    p: 2,
                    borderRadius: "5px",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "25px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "white",
                    }}
                >
                    <ShowChartIcon sx={{ color: "white" }} />
                    {title}
                </Typography>
                <Typography sx={{ color: "white" }}>
                    List of all dividen stock market transaction
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {data.length ? (
                    data.map((data) => cardDividen(data))
                ) : (
                    <Typography sx={{ textAlign: "center" }}>
                        No transaction
                    </Typography>
                )}
            </Box>
        </AuthenticatedLayout>
    );
}
