import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect, useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";

import dayjs from "dayjs";

import _ from "lodash";

import { Link, usePage, router, useForm } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InsightsIcon from "@mui/icons-material/Insights";

export default function Expense({ transactions, session_id }) {
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        setTransaction(transactions);
    }, [transactions]);

    const title = "Transaction List";

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
                <Typography sx={{ fontWeight: 600 }}>
                    {_.get(data.income, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "dividen_stock") {
            return (
                <Typography sx={{ fontWeight: 600 }}>
                    {_.get(data.stock, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "index_fund") {
            return (
                <Typography sx={{ fontWeight: 600 }}>
                    {_.get(data.fund, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "insurance") {
            return (
                <Typography sx={{ fontWeight: 600 }}>
                    {_.get(data.insurance, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "learning") {
            return (
                <Typography sx={{ fontWeight: 600 }}>
                    {_.get(data.learning, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "life") {
            return (
                <Typography sx={{ fontWeight: 600 }}>
                    {_.get(data.life, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "market") {
            return (
                <Typography sx={{ fontWeight: 600 }}>
                    {_.get(data.market, "title")}
                </Typography>
            );
        }
        if (data.invest_type == "real_estate") {
            return (
                <Typography sx={{ fontWeight: 600 }}>
                    {_.get(data.realestate, "title")}
                </Typography>
            );
        }
    };

    return (
        <AuthenticatedLayout header={title} breadcrumbs={null}>
            <Head title={title} />

            <Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                    }}
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

                <Box sx={{ mt: 2, mb: 2, bgcolor: "#f0f0f0", p: 2 }}>
                    <Typography
                        sx={{
                            fontSize: "25px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <InsightsIcon />
                        {title}
                    </Typography>
                    <Typography>List of all your transaction</Typography>
                </Box>

                <Box
                    sx={{
                        minHeight: "80vh",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {transaction.map((data, index) => (
                        <Box
                            key={index}
                            sx={{
                                bgcolor: "#efefef",
                                borderRadius: "5px",
                                p: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "14px" }}>
                                        ID: {data.id}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            bgcolor: color(data.invest_type),
                                            width: "fit-content",
                                            color: "white",
                                            px: 1,
                                            textTransform: "uppercase",
                                            borderRadius: "5px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {data.invest_type}
                                    </Typography>
                                </Box>

                                <Typography
                                    sx={{ color: "gray", fontSize: "12px" }}
                                >
                                    {dayjs(data.created_at).format(
                                        "DD MMM YYYY, hh:MMA",
                                    )}
                                </Typography>
                            </Box>

                            {transaction_title(data)}
                        </Box>
                    ))}
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
