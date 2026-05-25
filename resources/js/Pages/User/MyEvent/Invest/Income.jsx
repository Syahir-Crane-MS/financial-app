import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect, useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";

import dayjs from "dayjs";

import { Link, usePage, router, useForm } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import _ from "lodash";

export default function Income({ transactions, session_id }) {
    const title = "Income";

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(transactions);
    }, [transactions]);

    console.log(transactions);

    const cardIncome = (item) => {
        return (
            <Box
                sx={{ p: 2, border: "solid 1px gray", borderRadius: 1 }}
                key={item.id}
            >
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                    }}
                >
                    {item.income.title}
                </Typography>
                <Typography sx={{ color: "gray" }}>
                    <i>{item.income.description}</i>
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
                    {item.income.level}
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "20px" }}>Loan</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.income.loan)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "20px" }}>Monthly CF</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.income.monthly_cf)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "20px" }}>
                                Upfront Cost
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.income.upfront_cost)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "20px" }}>
                                Market Value
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.income.market_value)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "20px" }}>Valuation</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.income.valuation)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "20px" }}>
                                Energy Score
                            </td>
                            <td>
                                <b>{item.income.energy_score}</b>
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
                    bgcolor: "#429d0a",
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
                    <AccountBalanceWalletIcon sx={{ color: "white" }} />
                    {title}
                </Typography>
                <Typography sx={{ color: "white" }}>
                    List of all income transaction
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {data.length ? (
                    data.map((data) => cardIncome(data))
                ) : (
                    <Typography sx={{ textAlign: "center" }}>
                        No transaction
                    </Typography>
                )}
            </Box>
        </AuthenticatedLayout>
    );
}
