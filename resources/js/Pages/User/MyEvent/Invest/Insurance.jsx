import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useEffect, useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";

import dayjs from "dayjs";

import { Link, usePage, router, useForm } from "@inertiajs/react";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

export default function Insurance({ transactions, session_id }) {
    const title = "Insurance";

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(transactions);
    }, [transactions]);

    const cardInsurance = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", borderRadius: 1 }}>
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                    }}
                >
                    {item.insurance.title}
                </Typography>
                <Typography sx={{ color: "gray" }}>
                    <i>{item.insurance.description}</i>
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Monthly Contribution
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(
                                        item.insurance.monthly_contribution,
                                    )}
                                </b>
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
                    bgcolor: "#f18639",
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
                    <HealthAndSafetyIcon sx={{ color: "white" }} />
                    {title}
                </Typography>
                <Typography sx={{ color: "white" }}>
                    List of all insurance transaction
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {data.length ? (
                    data.map((data) => cardInsurance(data))
                ) : (
                    <Typography sx={{ textAlign: "center" }}>
                        No transaction
                    </Typography>
                )}
            </Box>
        </AuthenticatedLayout>
    );
}
