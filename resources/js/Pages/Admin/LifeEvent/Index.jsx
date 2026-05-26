import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useState } from "react";

import {
    Card,
    CardContent,
    Typography,
    Dialog,
    DialogContent,
} from "@mui/material";

import { Link, usePage, router } from "@inertiajs/react";

import QrCodeIcon from "@mui/icons-material/QrCode";

import { QRCodeSVG } from "qrcode.react";

export default function Index() {
    const title = "Life Event";

    const [openDialog, setOpenDialong] = useState(false);
    const [qrUUID, setQrUUID] = useState("");

    const handleDialogOpen = (data) => {
        setQrUUID(data);
        setOpenDialong(true);
    };

    const handleDialogClose = () => {
        setOpenDialong(false);
        setQrUUID("");
    };

    return (
        <AuthenticatedLayout header={title} breadcrumbs={null}>
            <Head title={title} />

            <Card
                sx={{ boxShadow: 0, borderRadius: "10px", bgcolor: "#e4f1d4" }}
            >
                <CardContent>
                    <Typography sx={{ fontSize: "18px", color: "#353d3a" }}>
                        {title}
                    </Typography>
                </CardContent>
            </Card>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogContent>
                    <QRCodeSVG
                        value={qrUUID}
                        size={200}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"H"}
                        includeMargin={false}
                    />
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
