import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Typography,
    Container,
    IconButton,
    Link,
    Breadcrumbs,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DataObjectIcon from "@mui/icons-material/DataObject";

import React, { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Terminal } from "@mui/icons-material";

import { router, Head } from "@inertiajs/react";

export default function Index({
    commandList,
    lastCommandOutput,
    lastCommandRun,
}) {
    const title = "Command";

    const [loadingCommand, setLoadingCommand] = useState(null);
    const [latestCommand, setLatestCommand] = useState(lastCommandRun);

    const handleRunCommand = (command) => {
        if (loadingCommand) return;
        setLoadingCommand(command);
        setLatestCommand(command);

        router.post(
            route("command.run"),
            { command },
            {
                preserveScroll: true,
                onFinish: () => {
                    setLoadingCommand(null);
                },
            },
        );
    };

    return (
        <AuthenticatedLayout
            header={title}
            breadcrumbs={
                <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{ lineHeight: 1, fontSize: "11px" }}
                >
                    <Link
                        underline="hover"
                        href="/dashboard"
                        sx={{ fontSize: "11px", color: "#36c0a4" }}
                    >
                        Dashboard
                    </Link>
                    <Typography
                        sx={{
                            fontSize: "11px",
                            lineHeight: 1,
                            fontWeight: 600,
                        }}
                    >
                        {title}
                    </Typography>
                </Breadcrumbs>
            }
        >
            <Head title={title} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Card
                    sx={{
                        boxShadow: 0,
                        borderRadius: "10px",
                        bgcolor: "white",
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            ":last-child": { pb: 2 },
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "18px",
                                color: "#353d3a",
                                fontWeight: 600,
                                lineHeight: 1,
                            }}
                        >
                            {title}
                        </Typography>
                    </CardContent>
                </Card>

                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {commandList.map((command, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                width: {
                                    xs: "100%",
                                    sm: "100%",
                                    md: "50%",
                                    lg: "25%",
                                },
                                padding: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: "#f5f5f5",
                                    padding: 0.5,
                                    pl: 2.2,
                                    position: "absolute",
                                    top: 24,
                                    left: 6.7,
                                    zIndex: 2,
                                    boxShadow:
                                        "inset -1px -1px 1px rgb(226 226 226)",
                                    borderTopRightRadius: 4,
                                    borderBottomRightRadius: 4,
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        maxWidth: "100%",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {command.command}
                                </Typography>
                            </Box>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    height: "100%",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.2,
                                            pt: 5,
                                        }}
                                    >
                                        {command.description}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{ justifyContent: "flex-end" }}
                                >
                                    <Button
                                        size="small"
                                        variant="contained"
                                        startIcon={
                                            loadingCommand ===
                                            command.command ? (
                                                <CircularProgress
                                                    size={16}
                                                    color="inherit"
                                                />
                                            ) : (
                                                <Terminal />
                                            )
                                        }
                                        disabled={!!loadingCommand}
                                        onClick={() =>
                                            handleRunCommand(command.command)
                                        }
                                    >
                                        {loadingCommand === command.command
                                            ? "Running..."
                                            : "Run Command"}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    ))}
                </Box>
                {lastCommandRun && (
                    <Box
                        sx={{
                            backgroundColor: "#000",
                            color: "#0f0",
                            fontFamily: "monospace",
                            borderRadius: 1,
                            p: 2,
                            my: 2,
                            mx: 1,
                            whiteSpace: "pre-wrap",
                            boxShadow: "inset 0 0 5px #0f0",
                        }}
                    >
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>&gt; {latestCommand}</strong>
                        </Typography>
                        <Typography variant="body2">
                            {loadingCommand === latestCommand ? (
                                <Box sx={{ pl: 1.8, pt: 2 }}>
                                    Running command...
                                </Box>
                            ) : (
                                lastCommandOutput || "No output"
                            )}
                        </Typography>
                    </Box>
                )}
            </Box>
        </AuthenticatedLayout>
    );
}
