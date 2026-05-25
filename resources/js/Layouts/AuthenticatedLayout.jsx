import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

import { Box, Container } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FlashMessage from "@/Components/FlashMessage";
import _ from "lodash";

export default function AuthenticatedLayout({ header, children, breadcrumbs }) {
    const user = usePage().props.auth?.user;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f7f7f7",
            }}
        >
            <FlashMessage />

            <Container
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
                {user.role !== "user" && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 1,
                            gap: 1,
                            mt: 1,
                        }}
                    >
                        <Sidebar />
                        <Header header={header} breadcrumbs={breadcrumbs} />
                    </Box>
                )}

                <main>{children}</main>
            </Container>
        </Box>
    );
}
