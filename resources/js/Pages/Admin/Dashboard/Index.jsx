import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Divider,
    Avatar,
} from "@mui/material";

import { usePage } from "@inertiajs/react";

import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import NewspaperIcon from "@mui/icons-material/Newspaper";

export default function Dashboard({
    users_count,
    active_event_count,
    inactive_event_count,
    data,
}) {
    const title = "Dashboard";
    const user = usePage().props.auth?.user;

    const category = [
        {
            name: "Dividen Stock Market",
            icon: <ShowChartIcon sx={{ color: "#36c0a4" }} />,
            href: route("dividen.index"),
            total: data.dividen,
        },
        {
            name: "Index Fund Market",
            icon: <ShowChartIcon sx={{ color: "#36c0a4" }} />,
            href: route("fund.index"),
            total: data.index,
        },
        {
            name: "Income",
            icon: <AccountBalanceWalletIcon sx={{ color: "#36c0a4" }} />,
            href: route("income.index"),
            total: data.income,
        },
        {
            name: "Learning",
            icon: <MenuBookIcon sx={{ color: "#36c0a4" }} />,
            href: route("learning.index"),
            total: data.learning,
        },
        {
            name: "Insurance",
            icon: <HealthAndSafetyIcon sx={{ color: "#36c0a4" }} />,
            href: route("insurance.index"),
            total: data.insurance,
        },
        {
            name: "Real Estate",
            icon: <HomeFilledIcon sx={{ color: "#36c0a4" }} />,
            href: route("realestate.index"),
            total: data.realestate,
        },
        {
            name: "Market News",
            icon: <NewspaperIcon sx={{ color: "#36c0a4" }} />,
            href: route("market.index"),
            total: data.market,
        },
        {
            name: "Life Event",
            icon: <Diversity1Icon sx={{ color: "#36c0a4" }} />,
            href: route("life.index"),
            total: data.life,
        },
    ];

    return (
        <AuthenticatedLayout header={title} breadcrumbs={null}>
            <Head title={title} />

            <Card sx={{ boxShadow: 0, borderRadius: "10px" }}>
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 2,
                        p: 3,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: 600,
                                lineHeight: 1.3,
                            }}
                        >
                            Financial Apps
                        </Typography>
                        <Typography sx={{ fontSize: "18px", color: "#353d3a" }}>
                            Hello, <b>{user?.name}</b>
                        </Typography>
                    </Box>

                    <Button
                        component={"a"}
                        href={route("event.index")}
                        sx={{
                            bgcolor: "#36c0a4",
                            borderRadius: "10px",
                            px: 1.5,
                        }}
                    >
                        <Typography
                            sx={{ textTransform: "capitalize", color: "white" }}
                        >
                            Let's Create New Event
                        </Typography>
                    </Button>
                </CardContent>
            </Card>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Card
                    sx={{
                        width: "50%",
                        boxShadow: 0,
                        borderRadius: "10px",
                        bgcolor: "#e4f1d4",
                        p: 2,
                    }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                <Typography sx={{ color: "#353d3a" }}>
                                    Total Event
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "30px",
                                        fontWeight: 600,
                                        color: "#353d3a",
                                    }}
                                >
                                    {active_event_count + inactive_event_count}
                                </Typography>

                                <Divider sx={{ pt: 1 }} />

                                <Box
                                    sx={{
                                        width: "100%",
                                        pt: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: "50px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography>Active</Typography>
                                        <ArrowForwardIcon />
                                        <Typography>
                                            {active_event_count}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography>Deactive</Typography>
                                        <ArrowForwardIcon />
                                        <Typography>
                                            {inactive_event_count}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    bgcolor: "#36c0a4",
                                    p: 2.5,

                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <EventNoteIcon
                                    sx={{
                                        fontSize: "30px",
                                        color: "white",
                                    }}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        width: "50%",
                        boxShadow: 0,
                        borderRadius: "10px",
                        bgcolor: "white",
                        p: 2,
                    }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                <Typography sx={{ color: "#353d3a" }}>
                                    Total Registered User
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "30px",
                                        fontWeight: 600,
                                        color: "#353d3a",
                                    }}
                                >
                                    {users_count}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    bgcolor: "#36c0a4",
                                    p: 2.5,

                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <AccountBoxIcon
                                    sx={{
                                        fontSize: "30px",
                                        color: "white",
                                    }}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                {category.map((data, index) => (
                    <Card
                        component={"a"}
                        href={data.href}
                        key={index}
                        sx={{
                            boxShadow: 0,
                            borderRadius: "10px",
                            width: "23.95%",

                            cursor: "pointer",
                            transition:
                                "background-color 0.3s ease, box-shadow 0.3s ease",

                            "&:hover": {
                                bgcolor: "#e4f1d4",
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                            },
                        }}
                    >
                        <CardHeader
                            sx={{ pb: 0 }}
                            avatar={
                                <Avatar sx={{ bgcolor: "#f1f1f1" }}>
                                    {data.icon}
                                </Avatar>
                            }
                            title={
                                <Typography
                                    sx={{
                                        color: "gray",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {data.name}
                                </Typography>
                            }
                        />
                        <CardContent
                            sx={{
                                display: "flex",
                                alignItems: "flex-end",
                                gap: 0.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "25px",
                                    fontWeight: 600,
                                    color: "#1c523e",
                                    lineHeight: 1,
                                }}
                            >
                                {data.total}
                            </Typography>
                            <Typography
                                sx={{ fontSize: "12px", color: "gray" }}
                            >
                                Total Data
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </AuthenticatedLayout>
    );
}
