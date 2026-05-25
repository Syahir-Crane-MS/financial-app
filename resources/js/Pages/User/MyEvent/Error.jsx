import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { Box, Typography, IconButton, Button } from "@mui/material";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import WarningIcon from "@mui/icons-material/Warning";

import { Link, usePage, router, useForm } from "@inertiajs/react";

export default function Error({ id, error }) {
    const title = error;

    return (
        <AuthenticatedLayout header={title} breadcrumbs={null}>
            <Head title={title} />

            <Box
                sx={{
                    height: "100vh",
                    maxHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",

                        mt: 2,
                    }}
                >
                    <IconButton
                        component="a"
                        href={route("myevent.view", [id])}
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
                        height: "100%",
                        bgcolor: "#fff8e3",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <WarningIcon sx={{ fontSize: "80px", color: "red" }} />
                    <Typography
                        sx={{
                            fontSize: "28px",
                            fontWeight: 600,
                            textAlign: "center",
                            lineHeight: 1.3,
                        }}
                    >
                        Error <br />
                        QR Code
                    </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Button
                        sx={{
                            width: "50%",
                            p: 2,
                            bgcolor: "yellow",
                            borderRadius: 0,
                            color: "black",
                        }}
                        component="a"
                        href={route("myevent.scanner", [id])}
                    >
                        Scan Again
                    </Button>
                    <Button
                        sx={{
                            width: "50%",
                            p: 2,
                            bgcolor: "black",
                            borderRadius: 0,
                            color: "white",
                        }}
                        component="a"
                        href={route("myevent.view", [id])}
                    >
                        Back
                    </Button>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
