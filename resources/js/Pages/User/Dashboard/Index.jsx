import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Container,
    IconButton,
    Avatar,
} from "@mui/material";

import { Link, usePage, router } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";

export default function Dashboard() {
    const title = "Dashboard";
    const user = usePage().props.auth?.user;

    const menu = [
        {
            href: route("event.eventList"),
            title: "Find Event",
            icon: <SearchIcon sx={{ color: "white", fontSize: "40px" }} />,
            bgcolor: "#f1406b",
        },
        {
            href: route("myevent.eventList"),
            title: "My Event",
            icon: <HistoryIcon sx={{ color: "white", fontSize: "40px" }} />,
            bgcolor: "#f4853c",
        },
    ];

    return (
        <AuthenticatedLayout header={title} breadcrumbs={null}>
            <Head title={title} />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
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
                    bgcolor: "#f2f5fb",
                    p: 2,
                    borderRadius: 1,
                    display: "flex",
                    mt: 2,
                    gap: 2,
                    borderRadius: "10px",
                }}
            >
                <Avatar sx={{ height: "50px", width: "50px" }} />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 0.5,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "18px",
                            lineHeight: 1,
                            fontWeight: 600,
                            color: "#6f6b8e",
                        }}
                    >
                        {user.name}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", lineHeight: 1 }}>
                        {user.role}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ my: 4 }}>
                <Typography sx={{ fontSize: "28px" }}>
                    Hello, <b>{user.name}</b>
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                {menu.map((data, index) => (
                    <Box
                        component={"a"}
                        href={data.href}
                        key={index}
                        sx={{
                            width: "100%",
                            height: "150px",
                            bgcolor: data.bgcolor,
                            p: 2,
                            borderRadius: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            {data.icon}
                        </Box>
                        <Box>
                            <Typography
                                sx={{ fontSize: "20px", color: "white" }}
                            >
                                {data.title}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </AuthenticatedLayout>
    );
}
