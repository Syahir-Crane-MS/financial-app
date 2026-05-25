import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect, useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";

import dayjs from "dayjs";

import { Link, usePage, router, useForm } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Diversity1Icon from "@mui/icons-material/Diversity1";

export default function Life({ transactions, session_id }) {
    const title = "Life Event";

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
                    mb: 4,
                    bgcolor: "#8939f1",
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
                    <Diversity1Icon sx={{ color: "white" }} />
                    {title}
                </Typography>
                <Typography sx={{ color: "white" }}>
                    List of all life event transaction
                </Typography>
            </Box>
        </AuthenticatedLayout>
    );
}
