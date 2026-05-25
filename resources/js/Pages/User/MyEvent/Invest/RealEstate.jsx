import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect, useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";

import dayjs from "dayjs";

import { Link, usePage, router, useForm } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

export default function RealEstate({ transactions, session_id }) {
    const title = "Real Estate";

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(transactions);
    }, [transactions]);

    const cardRealEstate = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", borderRadius: 1 }}>
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                    }}
                >
                    {item.realestate.title}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "gray" }}>
                    <i>{item.description}</i>
                </Typography>
                <Typography
                    sx={{
                        textTransform: "capitalize",
                        px: 2,
                        borderRadius: "50px",
                        border: "solid 1px gray",
                        width: "fit-content",

                        mt: 1,
                    }}
                >
                    {item.realestate.type}
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Loan</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.realestate.loan)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Monthly CF</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.realestate.monthly_cf)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Downpayment
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.realestate.down_payment)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Market Value
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.realestate.market_value)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Selling Price
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.realestate.selling_price)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Est Cash Out
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.realestate.est_cash_out)}
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
                    bgcolor: "#4f47dc",
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
                    <HomeWorkIcon sx={{ color: "white" }} />
                    {title}
                </Typography>
                <Typography sx={{ color: "white" }}>
                    List of all real estate transaction
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {data.length ? (
                    data.map((data) => cardRealEstate(data))
                ) : (
                    <Typography sx={{ textAlign: "center" }}>
                        No transaction
                    </Typography>
                )}
            </Box>
        </AuthenticatedLayout>
    );
}
