import { Box, Typography, IconButton } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function Menu({ session }) {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: "20px",
                bgcolor: "white",
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "10px",
                boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                display: "flex",
                gap: 1,
                justifyContent: "space-around",
                width: "93vw",
                maxWidth: "450px",
                zIndex: 10,
            }}
        >
            <IconButton
                component={"a"}
                href={route("myevent.view", [session.id])}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: 3,
                    width: "30%",
                }}
            >
                <HomeIcon sx={{ fontSize: "25px" }} />
                <Typography sx={{ fontSize: "14px" }}>Home</Typography>
            </IconButton>
            <IconButton
                component={"a"}
                href={route("myevent.scanner", [session.id])}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    height: "95px",
                    width: "95px",
                    border: "solid 3px gray",
                    my: "-10px",
                    bgcolor: "yellow",
                }}
            >
                <QrCode2Icon sx={{ fontSize: "35px", color: "black" }} />
                <Typography sx={{ fontSize: "12px", color: "black" }}>
                    QR Scan
                </Typography>
            </IconButton>
            <IconButton
                component={"a"}
                href={route("transaction.viewAll", [session.id])}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: 3,
                    width: "30%",
                }}
            >
                <TimelineIcon sx={{ fontSize: "25px" }} />
                <Typography sx={{ fontSize: "14px" }}>Expense</Typography>
            </IconButton>
        </Box>
    );
}
