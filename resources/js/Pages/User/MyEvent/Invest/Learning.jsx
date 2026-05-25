import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect, useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";

import dayjs from "dayjs";

import { Link, usePage, router, useForm } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function Learning({ transactions, session_id }) {
    const title = "Learning";

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(transactions);
    }, [transactions]);

    const cardLearning = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", borderRadius: 1 }}>
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.learning.title}
                </Typography>
                <Typography sx={{ color: "gray" }}>
                    <i>{item.description}</i>
                </Typography>
                <Typography
                    sx={{
                        textTransform: "capitalize",
                        px: 2,
                        borderRadius: "50px",
                        border: "solid 1px gray",
                        width: "fit-content",

                        mt: 1,
                    }}
                >
                    {item.learning.category}
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Upfront Cost
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.learning.upfront_cost)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Impact</td>
                            <td>
                                <b>{item.learning.impact}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Life Score</td>
                            <td>
                                <b>{item.learning.life_score}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Energy Score
                            </td>
                            <td>
                                <b>{item.learning.energy_score}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Prequisite</td>
                            <td>
                                <b>{item.learning.pre_requisite}</b>
                            </td>
                        </tr>
                    </table>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontSize: "14px", color: "gray" }}>
                        <b>Purchased on:</b>{" "}
                        {dayjs(item.created_at).format("DD MMMM YYYY, hh:MMA")}
                    </Typography>
                </Box>
            </Box>
        );
    };

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
                    mb: 2,
                    bgcolor: "#39a1f1",
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
                    <MenuBookIcon sx={{ color: "white" }} />
                    {title}
                </Typography>
                <Typography sx={{ color: "white" }}>
                    List of all learning transaction
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {data.length ? (
                    data.map((data) => cardLearning(data))
                ) : (
                    <Typography sx={{ textAlign: "center" }}>
                        No transaction
                    </Typography>
                )}
            </Box>
        </AuthenticatedLayout>
    );
}
