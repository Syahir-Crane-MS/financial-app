import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    IconButton,
    Modal,
    TextField,
    Divider,
    Button,
    FormControl,
} from "@mui/material";

import dayjs from "dayjs";

import { Link, usePage, router, useForm } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CircleIcon from "@mui/icons-material/Circle";

import _ from "lodash";

export default function Index({ events }) {
    const title = "My Event";

    const [event, setEvent] = useState([]);

    useEffect(() => {
        setEvent(events);
    }, [events]);

    return (
        <AuthenticatedLayout header={title} breadcrumbs={null}>
            <Head title={title} />

            <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
                <IconButton
                    component="a"
                    href={route("dashboard.home")}
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

            <Box sx={{ mt: 2, mb: 4 }}>
                <Typography
                    sx={{
                        fontSize: "25px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <DateRangeIcon />
                    {title}
                </Typography>
                <Typography>Select your registered event</Typography>
            </Box>

            {event.length ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {event.map((data, index) => (
                        <Box
                            component={"a"}
                            key={data.id || index}
                            sx={{
                                bgcolor: "#f4853c",
                                p: 2,
                                borderRadius: 2,
                                height: "120px",
                            }}
                            href={route("myevent.view", [data.id])}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "white",
                                            fontWeight: 600,
                                            fontSize: "25px",
                                        }}
                                    >
                                        {_.get(data.event, "title")}
                                    </Typography>

                                    <CircleIcon
                                        sx={{
                                            color:
                                                data.status == "active"
                                                    ? "#4fd94f"
                                                    : "#eeeeee",
                                        }}
                                    />
                                </Box>

                                <Typography
                                    sx={{
                                        display: "block",
                                        mt: 1,
                                        color: "white",
                                    }}
                                >
                                    Date:{" "}
                                    {dayjs(data.updated_at).format(
                                        "DD MMMM YYYY",
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box sx={{ bgcolor: "#e5e5e5", p: 2 }}>
                    <Typography sx={{ textAlign: "center" }}>
                        No Event Available
                    </Typography>
                </Box>
            )}
        </AuthenticatedLayout>
    );
}
