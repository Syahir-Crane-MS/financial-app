import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
} from "@mui/material";

import { Link, usePage, router } from "@inertiajs/react";

import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Dashboard({
    users_count,
    active_event_count,
    inactive_event_count,
}) {
    const title = "Dashboard";
    const user = usePage().props.auth?.user;

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
                                fontSize: "30px",
                                fontWeight: 600,
                                lineHeight: 1.3,
                            }}
                        >
                            Financial Apps
                        </Typography>
                        <Typography sx={{ fontSize: "20px", color: "#353d3a" }}>
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

                                <Box sx={{ width: "80%", pt: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            width: "60%",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography sx={{ width: "60px" }}>
                                            Active
                                        </Typography>
                                        <ArrowForwardIcon />
                                        <Typography>
                                            {active_event_count}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            width: "60%",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography sx={{ width: "60px" }}>
                                            Deactive
                                        </Typography>
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
        </AuthenticatedLayout>
    );
}
