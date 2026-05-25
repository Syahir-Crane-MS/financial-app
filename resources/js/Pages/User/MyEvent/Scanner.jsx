import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

import React, { useEffect } from "react";

import { Button, Box, Typography } from "@mui/material";

import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScannerModal({ id }) {
    const title = "QR Scanner";

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            fps: 10,
            qrbox: { width: 250, height: 250 },
        });

        scanner.render(
            (decodedText) => {
                scanner
                    .clear()
                    .then(() => {
                        router.get(route("myevent.result", [id]), {
                            code: decodedText,
                        });
                    })
                    .catch((err) => console.error(err));
            },
            (error) => {},
        );

        return () => {
            scanner
                .clear()
                .catch((error) =>
                    console.error("Failed to close scanner", error),
                );
        };
    }, [id]);

    return (
        <AuthenticatedLayout header={title} breadcrumbs={null}>
            <Head title={title} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100vh",
                    maxHeight: "100vh",
                }}
            >
                <Box sx={{ p: 2, bgcolor: "gray" }}>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "25px",
                            color: "white",
                        }}
                    >
                        Scan QR Code
                    </Typography>
                </Box>

                <div id="reader" style={{ width: "100%" }}></div>

                <Button
                    component={"a"}
                    href={route("myevent.view", [id])}
                    sx={{
                        width: "100%",
                        bgcolor: "#ca0c0c",
                        fontSize: "20px",
                        color: "white",
                        borderRadius: 0,
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </AuthenticatedLayout>
    );
}
