import { useState, useEffect } from "react";

import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    Button,
} from "@mui/material";

import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import ReorderIcon from "@mui/icons-material/Reorder";
import PixIcon from "@mui/icons-material/Pix";
import EventIcon from "@mui/icons-material/Event";

import { usePage, Link } from "@inertiajs/react";

export default function Sidebar({}) {
    const [open, setOpen] = useState(false);
    const { url } = usePage();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const menu = [
        {
            name: "Dashboard",
            icon: <HomeFilledIcon sx={{ fontSize: "20px" }} />,
            routeName: "dashboard.*",
            href: route("dashboard.index"),
        },
        {
            name: "Event Session",
            icon: <EventIcon sx={{ fontSize: "20px" }} />,
            routeName: "event.*",
            href: route("event.index"),
        },
        {
            name: "User",
            icon: <PersonIcon sx={{ fontSize: "20px" }} />,
            routeName: "participant.*",
            href: route("participant.index"),
        },
        {
            name: "Income",
            icon: <AccountBalanceWalletIcon sx={{ fontSize: "20px" }} />,
            routeName: "income.*",
            href: route("income.index"),
        },
        {
            name: "Index Fund Market",
            icon: <ShowChartIcon sx={{ fontSize: "20px" }} />,
            routeName: "fund.*",
            href: route("fund.index"),
        },
        {
            name: "Dividen Stock Market",
            icon: <ShowChartIcon sx={{ fontSize: "20px" }} />,
            routeName: "dividen.*",
            href: route("dividen.index"),
        },
        {
            name: "Real Estate",
            icon: <HomeWorkIcon sx={{ fontSize: "20px" }} />,
            routeName: "realestate.*",
            href: route("realestate.index"),
        },
        {
            name: "Insurance",
            icon: <HealthAndSafetyIcon sx={{ fontSize: "20px" }} />,
            routeName: "insurance.*",
            href: route("insurance.index"),
        },
        {
            name: "Learning",
            icon: <MenuBookIcon sx={{ fontSize: "20px" }} />,
            routeName: "learning.*",
            href: route("learning.index"),
        },
        {
            name: "Market News",
            icon: <NewspaperIcon sx={{ fontSize: "20px" }} />,
            routeName: "market.*",
            href: route("market.index"),
        },
        {
            name: "Life Event",
            icon: <Diversity1Icon sx={{ fontSize: "20px" }} />,
            routeName: "life.*",
            href: route("life.index"),
        },
    ];

    return (
        <Box sx={{ bgcolor: "white" }}>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 280, pt: 2 }} role="presentation">
                    <Button
                        sx={{
                            gap: 1,
                            ml: 1,
                            width: "100%",
                            justifyContent: "flex-start",
                        }}
                        href={route("dashboard.index")}
                    >
                        <PixIcon sx={{ color: "#36c0a4" }} />

                        <Typography
                            sx={{
                                textTransform: "capitalize",

                                color: "#3d5652",

                                fontWeight: 600,
                            }}
                        >
                            FinanceApps
                        </Typography>
                    </Button>
                    <List sx={{ mx: 2, mt: 1 }}>
                        {menu.map((item, index) => {
                            const isActive = route().current(item.routeName);

                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        href={item.href}
                                        onClick={toggleDrawer(false)}
                                        sx={{
                                            borderRadius: "8px",
                                            mb: 0.5,
                                            // STYLE JIKA ACTIVE
                                            bgcolor: isActive
                                                ? "#36c0a4"
                                                : "transparent",
                                            "&:hover": {
                                                bgcolor: isActive
                                                    ? "#36c0a4"
                                                    : "#f5f5f5",
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                color: isActive
                                                    ? "white"
                                                    : "inherit",
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.name}
                                            sx={{
                                                "& .MuiTypography-root": {
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    // WARNA TEXT JIKA ACTIVE
                                                    color: isActive
                                                        ? "white"
                                                        : "gray",
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>

            <IconButton
                onClick={toggleDrawer(true)}
                sx={{ bgcolor: "#e4f1d4", borderRadius: "5px" }}
            >
                <ReorderIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}
