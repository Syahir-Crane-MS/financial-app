import { useState } from "react";

import {
    Box,
    Button,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    ListItemIcon,
    ListItemText,
    Stack,
    Fade,
    Menu,
    Avatar,
    Typography,
    IconButton,
    InputBase,
    Divider,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";

import { Link, usePage, router } from "@inertiajs/react";

export default function Header({ header, breadcrumbs }) {
    const user = usePage().props.auth?.user;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 0.5,
                }}
            >
                <Typography
                    sx={{ color: "#353d3a", fontWeight: 600, lineHeight: 1 }}
                >
                    {header}
                </Typography>
                {breadcrumbs}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Paper
                    component="form"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 300,
                        boxShadow: 0,
                    }}
                >
                    <IconButton type="button" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search anything"
                        inputProps={{ "aria-label": "search anything" }}
                    />
                </Paper>

                <IconButton
                    sx={{ bgcolor: "#e4f1d4", borderRadius: "5px", width: 40 }}
                    component={"a"}
                    href={route("command.index")}
                >
                    <SettingsIcon fontSize="small" />
                </IconButton>
                <IconButton
                    sx={{ bgcolor: "#e4f1d4", borderRadius: "5px", width: 40 }}
                >
                    <NotificationsActiveIcon fontSize="small" />
                </IconButton>
                <Button
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={handleClick}
                    sx={{
                        fontSize: "14px",
                        textTransform: "capitalize",
                        display: "flex",
                        gap: "5px",
                        width: "fit-content",
                        minWidth: "140px",
                        justifyContent: "flex-start",
                        gap: 1,
                        p: 0,
                    }}
                >
                    <Avatar sx={{ height: "35px", width: "35px" }} />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 600,
                                lineHeight: 1.3,
                                color: "#353d3a",
                            }}
                        >
                            {user?.name}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "11px",
                                lineHeight: 1,
                                color: "gray",
                            }}
                        >
                            {user?.role}
                        </Typography>
                    </Box>
                </Button>
                <Menu
                    id="fade-menu"
                    slotProps={{
                        list: {
                            "aria-labelledby": "fade-button",
                        },
                        paper: {
                            sx: {
                                boxShadow: "none",
                                width: "150px",
                                border: "solid 1px #f7f7f7",
                            },
                        },
                    }}
                    slots={{ transition: Fade }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem
                        component="a"
                        onClick={handleClose}
                        href={route("profile.edit")}
                    >
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Profile"
                            sx={{
                                "& .MuiTypography-root": {
                                    fontSize: 13,
                                },
                            }}
                        />
                    </MenuItem>
                    <MenuItem
                        component="a"
                        onClick={() => {
                            handleClose();
                            router.post(route("logout"));
                        }}
                    >
                        <ListItemIcon>
                            <PowerSettingsNewIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Logout"
                            sx={{
                                "& .MuiTypography-root": {
                                    fontSize: 13,
                                },
                            }}
                        />
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
