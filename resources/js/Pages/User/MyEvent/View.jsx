import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect, useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";

import dayjs from "dayjs";

import _ from "lodash";

import { Link, usePage, router, useForm } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CircleIcon from "@mui/icons-material/Circle";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WalletIcon from "@mui/icons-material/Wallet";

import Menu from "./partial/Menu";

export default function Index({ sessions }) {
    const [session, setSession] = useState([]);

    console.log(sessions);

    useEffect(() => {
        setSession(sessions);
    }, [sessions]);

    const title = _.get(session.event, "title");
    const status = session.status;

    const list = [
        {
            title: "Side Income",
            icon: <AccountBalanceWalletIcon sx={{ color: "white" }} />,
            bgcolor: "#429d0a",
            href: route("transaction.viewIncome", [sessions.id]),
        },
        {
            title: "Index Fund Market",
            icon: <ShowChartIcon sx={{ color: "white" }} />,
            bgcolor: "#f03f6a",
            href: route("transaction.viewFund", [sessions.id]),
        },
        {
            title: "Dividen Stock Market",
            icon: <ShowChartIcon sx={{ color: "white" }} />,
            bgcolor: "#4ce1e1",
            href: route("transaction.viewStock", [sessions.id]),
        },
        {
            title: "Real Estate Market",
            icon: <HomeWorkIcon sx={{ color: "white" }} />,
            bgcolor: "#4f47dc",
            href: route("transaction.viewRealEstate", [sessions.id]),
        },
        {
            title: "Insurance",
            icon: <HealthAndSafetyIcon sx={{ color: "white" }} />,
            bgcolor: "#f18639",
            href: route("transaction.viewInsurance", [sessions.id]),
        },
        {
            title: "Learning",
            icon: <MenuBookIcon sx={{ color: "white" }} />,
            bgcolor: "#39a1f1",
            href: route("transaction.viewLearning", [sessions.id]),
        },
        {
            title: "Market News",
            icon: <NewspaperIcon sx={{ color: "white" }} />,
            bgcolor: "#5e6870",
            href: route("transaction.viewMarket", [sessions.id]),
        },
        {
            title: "Life Event",
            icon: <Diversity1Icon sx={{ color: "white" }} />,
            bgcolor: "#8939f1",
            href: route("transaction.viewLife", [sessions.id]),
        },
    ];

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
                        href={route("myevent.eventList")}
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
                        mb: 4,
                        p: 3,
                        height: "300px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: "25px",
                        boxShadow:
                            " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                        background:
                            "radial-gradient(circle,rgba(86, 61, 150, 1) 0%, rgba(59, 31, 132, 1) 50%)",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <CircleIcon
                            sx={{
                                color:
                                    session.status == "active"
                                        ? "#4fd94f"
                                        : "#eeeeee",
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "30px",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                color: "white",
                                mb: 1,
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            sx={{
                                bgcolor: "white",
                                width: "fit-content",
                                px: 2,
                                borderRadius: "10px",
                                textTransform: "capitalize",
                            }}
                        >
                            {status}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <AttachMoneyIcon
                            sx={{ fontSize: "60px", color: "white" }}
                        />
                        <Box>
                            <Typography
                                sx={{ color: "white", fontSize: "20px" }}
                            >
                                Initial Salary:{" "}
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(sessions.event.initial_salary)}
                                </b>
                            </Typography>
                            <Typography
                                sx={{ color: "white", fontSize: "20px" }}
                            >
                                Current Money: <b>RM 0.00</b>
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignContent: "flex-start",
                        gap: 2,
                        minHeight: "70vh",
                    }}
                >
                    {list.map((data, index) => (
                        <Box
                            key={index}
                            sx={{
                                bgcolor: data.bgcolor,
                                width: "47%",
                                height: "100px",
                                p: 2,
                                borderRadius: "10px",
                                boxShadow:
                                    " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                            component={"a"}
                            href={data.href}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {data.icon}
                            </Box>
                            <Box>
                                <Typography
                                    sx={{ fontSize: "16px", color: "white" }}
                                >
                                    {data.title}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Menu session={sessions} />
            </Box>
        </AuthenticatedLayout>
    );
}
