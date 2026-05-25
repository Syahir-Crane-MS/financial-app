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

export default function EventList({ events }) {
    const title = "Event List";

    const { data, setData, post, put, processing, reset, errors, clearErrors } =
        useForm({
            event_id: "",
            passcode: "",
        });

    const [event, setEvent] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    useEffect(() => {
        setEvent(events);
    }, [events]);

    const selectEvent = (item) => {
        setOpen(true);
        setModalTitle(item.title);
        setData("event_id", item.id);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("myevent.create"), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

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
                <Typography>
                    Select any event and insert the passcode
                </Typography>
            </Box>
            {event.length ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {event.map((data, index) => (
                        <Box
                            key={data.id || index}
                            sx={{
                                bgcolor:
                                    data.active === "true"
                                        ? "#f1406b"
                                        : "#gray",
                                p: 2,
                                borderRadius: 2,
                                height: "120px",
                            }}
                            onClick={() => selectEvent(data)}
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
                                        {data.title}
                                    </Typography>

                                    <CircleIcon
                                        sx={{
                                            color:
                                                data.active == "true"
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

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        borderRadius: "10px",
                        boxShadow: 24,
                        bgcolor: "white",
                        p: 3,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                        }}
                    >
                        {modalTitle}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <Typography sx={{ mb: 1 }}>
                                Enter Passcode
                            </Typography>
                            <TextField
                                value={data.passcode}
                                error={errors.passcode}
                                size="small"
                                onChange={(e) =>
                                    setData("passcode", e.target.value)
                                }
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={processing}
                            sx={{
                                mt: 2,
                                bgcolor: "#36c0a4",
                                color: "white",
                                "&:hover": { bgcolor: "#3d5652" },
                            }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </AuthenticatedLayout>
    );
}
