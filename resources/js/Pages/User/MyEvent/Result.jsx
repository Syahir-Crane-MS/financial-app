import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useState, useEffect } from "react";

import _ from "lodash";

import { Box, Typography, IconButton, Button } from "@mui/material";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import { Link, usePage, router, useForm } from "@inertiajs/react";

export default function Result({ id, scanned_code, model_type, result_data }) {
    const title = "Scan Result";

    const [model, setModel] = useState("");
    const [result, setResult] = useState([]);

    const { data, setData, post, put, processing, reset, errors, clearErrors } =
        useForm({
            event_id: "",
            session_id: id,
            invest_uuid: result_data.uuid,
            invest_type: model_type,
        });

    useEffect(() => {
        setModel(model_type);
        setResult(result_data);
    }, [model_type]);

    const cardDividen = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", m: 2, borderRadius: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#429d0a",
                        p: 1,
                        mb: 1,
                    }}
                >
                    <ShowChartIcon sx={{ color: "white" }} />
                    <Typography sx={{ fontSize: "20px", color: "white" }}>
                        Dividen Stock
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.title}
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Stock Price
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.current_stock_price)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Dividen</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.dividen_per_share)}
                                </b>
                            </td>
                        </tr>
                    </table>
                </Box>
            </Box>
        );
    };

    const cardIncome = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", m: 2, borderRadius: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#429d0a",
                        p: 1,
                        mb: 1,
                    }}
                >
                    <AccountBalanceWalletIcon sx={{ color: "white" }} />
                    <Typography sx={{ fontSize: "20px", color: "white" }}>
                        Income
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.title}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "gray" }}>
                    <i>{item.description}</i>
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        textTransform: "capitalize",
                        px: 2,
                        borderRadius: "50px",
                        border: "solid 1px gray",
                        width: "fit-content",
                        mx: "auto",
                        mt: 1,
                    }}
                >
                    {item.level}
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Loan</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.loan)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Monthly CF</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.monthly_cf)}
                                </b>
                            </td>
                        </tr>
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
                                    }).format(item.upfront_cost)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Market Value
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.market_value)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Valuation</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.valuation)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Energy Score
                            </td>
                            <td>
                                <b>{item.energy_score}</b>
                            </td>
                        </tr>
                    </table>
                </Box>
            </Box>
        );
    };

    const cardFund = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", m: 2, borderRadius: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#f03f6a",
                        p: 1,
                        mb: 1,
                    }}
                >
                    <ShowChartIcon sx={{ color: "white" }} />
                    <Typography sx={{ fontSize: "20px", color: "white" }}>
                        Index Fund Market
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.title}
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Current Fund Price
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.current_fund_price)}
                                </b>
                            </td>
                        </tr>
                    </table>
                </Box>
            </Box>
        );
    };

    const cardInsurance = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", m: 2, borderRadius: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#f18639",
                        p: 1,
                        mb: 1,
                    }}
                >
                    <HealthAndSafetyIcon sx={{ color: "white" }} />
                    <Typography sx={{ fontSize: "20px", color: "white" }}>
                        Insurance
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.title}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "gray" }}>
                    <i>{item.description}</i>
                </Typography>

                <Box sx={{ mt: 3 }}>
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
                                    }).format(item.monthly_contribution)}
                                </b>
                            </td>
                        </tr>
                    </table>
                </Box>
            </Box>
        );
    };

    const cardLearning = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", m: 2, borderRadius: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#39a1f1",
                        p: 1,
                        mb: 1,
                    }}
                >
                    <MenuBookIcon sx={{ color: "white" }} />
                    <Typography sx={{ fontSize: "20px", color: "white" }}>
                        Market News
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.title}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "gray" }}>
                    <i>{item.description}</i>
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        textTransform: "capitalize",
                        px: 2,
                        borderRadius: "50px",
                        border: "solid 1px gray",
                        width: "fit-content",
                        mx: "auto",
                        mt: 1,
                    }}
                >
                    {item.category}
                </Typography>

                <Box sx={{ mt: 3 }}>
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
                                    }).format(item.upfront_cost)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Impact</td>
                            <td>
                                <b>{item.impact}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Life Score</td>
                            <td>
                                <b>{item.life_score}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Energy Score
                            </td>
                            <td>
                                <b>{item.energy_score}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Prequisite</td>
                            <td>
                                <b>{item.pre_requisite}</b>
                            </td>
                        </tr>
                    </table>
                </Box>
            </Box>
        );
    };

    const cardLife = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", m: 2, borderRadius: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#8939f1",
                        p: 1,
                        mb: 1,
                    }}
                >
                    <Diversity1Icon sx={{ color: "white" }} />
                    <Typography sx={{ fontSize: "20px", color: "white" }}>
                        Life Event
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.title}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "gray" }}>
                    <i>{item.description}</i>
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        textTransform: "capitalize",
                        px: 2,
                        borderRadius: "50px",
                        border: "solid 1px gray",
                        width: "fit-content",
                        mx: "auto",
                        mt: 1,
                    }}
                >
                    {item.category}
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Category</td>
                            <td>
                                <b>{item.trajectory}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Impact</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.impact)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Life Score</td>
                            <td>
                                <b>{item.life_score}</b>
                            </td>
                        </tr>
                    </table>
                </Box>
            </Box>
        );
    };

    const cardMarket = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", m: 2, borderRadius: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#5e6870",
                        p: 1,
                        mb: 1,
                    }}
                >
                    <NewspaperIcon sx={{ color: "white" }} />
                    <Typography sx={{ fontSize: "20px", color: "white" }}>
                        Market List
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.title}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "gray" }}>
                    <i>{item.description}</i>
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        textTransform: "capitalize",
                        px: 2,
                        borderRadius: "50px",
                        border: "solid 1px gray",
                        width: "fit-content",
                        mx: "auto",
                        mt: 1,
                    }}
                >
                    {item.level}
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Market Climate
                            </td>
                            <td>
                                <b>{item.market_climate}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Impact</td>
                            <td>
                                <b>{item.impact}</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Life Score</td>
                            <td>
                                <b>{item.life_score}</b>
                            </td>
                        </tr>
                    </table>
                </Box>

                <Typography sx={{ textAlign: "center", color: "gray" }}>
                    <i>{item.sub_description}</i>
                </Typography>
            </Box>
        );
    };

    const cardRealEstate = (item) => {
        return (
            <Box sx={{ p: 2, border: "solid 1px gray", m: 2, borderRadius: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#4f47dc",
                        p: 1,
                        mb: 1,
                    }}
                >
                    <HomeWorkIcon sx={{ color: "white" }} />
                    <Typography sx={{ fontSize: "20px", color: "white" }}>
                        Real Estate
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 600,
                        pt: 1,
                    }}
                >
                    {item.title}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "gray" }}>
                    <i>{item.description}</i>
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        textTransform: "capitalize",
                        px: 2,
                        borderRadius: "50px",
                        border: "solid 1px gray",
                        width: "fit-content",
                        mx: "auto",
                        mt: 1,
                    }}
                >
                    {item.type}
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <table id="table-result">
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Loan</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.loan)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>Monthly CF</td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.monthly_cf)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Downpayment
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.down_payment)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Market Value
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.market_value)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Selling Price
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.selling_price)}
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: "10px" }}>
                                Est Cash Out
                            </td>
                            <td>
                                <b>
                                    RM{" "}
                                    {new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.est_cash_out)}
                                </b>
                            </td>
                        </tr>
                    </table>
                </Box>
            </Box>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("transaction.create"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout header={title} breadcrumbs={null}>
            <Head title={title} />

            <Box
                sx={{
                    height: "100vh",
                    maxHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",

                        mt: 2,
                    }}
                >
                    <IconButton
                        component="a"
                        href={route("myevent.view", [id])}
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

                <Box sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            p: 2,
                            background:
                                "linear-gradient(to right, #ff5555, #6025f5)",
                            height: "100%",
                            borderRadius: "10px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                p: 2,
                                background:
                                    "linear-gradient(to right, #ff5555, #6025f5)",
                                width: "100%",
                            }}
                        >
                            <AutoAwesomeIcon
                                sx={{ fontSize: "30px", color: "white" }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: 600,
                                    color: "white",
                                }}
                            >
                                QR Result
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                bgcolor: "white",
                                height: "100%",
                                width: "100%",
                                borderRadius: "5px",
                            }}
                        >
                            {model == "income" && cardIncome(result)}
                            {model == "dividen_stock" && cardDividen(result)}
                            {model == "index_fund" && cardFund(result)}
                            {model == "insurance" && cardInsurance(result)}
                            {model == "learning" && cardLearning(result)}
                            {model == "live_event" && cardLife(result)}
                            {model == "market_list" && cardMarket(result)}
                            {model == "real_estate" && cardRealEstate(result)}

                            <Button
                                sx={{
                                    width: "90%",
                                    display: "flex",
                                    gap: 2,
                                    bgcolor: "black",
                                    mt: 2,
                                    mx: "auto",
                                }}
                                onClick={handleSubmit}
                            >
                                <ShoppingCartCheckoutIcon
                                    sx={{ color: "white", fontSize: "25px" }}
                                />
                                <Typography
                                    sx={{ color: "white", fontSize: "18px" }}
                                >
                                    Purchase
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <Button
                        sx={{
                            width: "50%",
                            p: 2,
                            bgcolor: "yellow",
                            borderRadius: 0,
                            color: "black",
                        }}
                        component="a"
                        href={route("myevent.scanner", [id])}
                    >
                        Scan Again
                    </Button>
                    <Button
                        sx={{
                            width: "50%",
                            p: 2,
                            bgcolor: "black",
                            borderRadius: 0,
                            color: "white",
                        }}
                        component="a"
                        href={route("myevent.view", [id])}
                    >
                        Back
                    </Button>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
