import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Head } from "@inertiajs/react";
import { QRCodeSVG } from "qrcode.react";
import { LineChart } from "@mui/x-charts/LineChart";

const Card = ({ item }) => {
    const fullList = item.list || [];

    const [tickCount, setTickCount] = useState(1);

    const [reflectedPrice, setReflectedPrice] = useState(
        parseFloat(item.current_stock_price) || 0,
    );

    useEffect(() => {
        if (fullList.length === 0) return;

        const interval = setInterval(() => {
            setTickCount((prevCount) => prevCount + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, [fullList.length]);

    let visibleData = [];
    if (fullList.length > 0) {
        if (tickCount <= 15) {
            visibleData = fullList.slice(0, tickCount);
        } else {
            const startIndex = (tickCount - 15) % fullList.length;
            for (let i = 0; i < 15; i++) {
                const index = (startIndex + i) % fullList.length;
                visibleData.push(fullList[index]);
            }
        }
    }

    useEffect(() => {
        if (fullList.length === 0) return;

        const currentDataIndex = (tickCount - 1) % fullList.length;
        const currentTickData = fullList[currentDataIndex];

        if (currentTickData) {
            const magnitude = parseFloat(currentTickData.magnitude) || 0;
            const percentage = magnitude / 100;

            setReflectedPrice((prevPrice) => {
                if (currentTickData.direction === "negative") {
                    return prevPrice - prevPrice * percentage;
                } else {
                    return prevPrice + prevPrice * percentage;
                }
            });
        }
    }, [tickCount, fullList.length]);

    const seriesData = visibleData.map((d) => {
        const value = parseFloat(d.magnitude) || 0;
        return d.direction === "negative" ? -value : value;
    });
    const xAxisData = Array.from({ length: seriesData.length }, (_, i) => i);

    const latestData = visibleData[visibleData.length - 1] || {
        direction: "positive",
        magnitude: 0,
    };
    const isCurrentNegative = latestData.direction === "negative";

    const forexColor = isCurrentNegative ? "#ff3366" : "#00ff66";

    return (
        <Box
            sx={{
                bgcolor: "#233759",
                p: 3,
                borderRadius: "20px",
                border: "solid 3px #00f3ff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

                width: "48%",
            }}
        >
            <Box sx={{ width: "45%" }}>
                <Typography
                    sx={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {item.title}
                    <span
                        style={{
                            fontSize: "16px",
                            color: forexColor,
                            fontWeight: "bold",
                            transition: "color 0.2s ease",
                        }}
                    >
                        {isCurrentNegative ? "▼" : "▲"} {latestData.magnitude}%
                    </span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: "20px",
                        color: forexColor,
                        fontWeight: "bold",

                        transition: "color 0.2s ease",
                    }}
                >
                    RM{" "}
                    {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(reflectedPrice)}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "20px",
                        color: forexColor,
                        fontWeight: "bold",
                        mb: 0.5,
                        transition: "color 0.2s ease",
                    }}
                >
                    DIVIDEN {item.dividen_per_share}%
                </Typography>

                <Box
                    sx={{
                        bgcolor: "white",
                        p: 1,
                        borderRadius: "10px",
                        width: "fit-content",
                    }}
                >
                    <QRCodeSVG
                        value={item.uuid || item.title}
                        size={150}
                        level={"H"}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    width: "55%",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {seriesData.length > 0 ? (
                    <LineChart
                        xAxis={[
                            {
                                data: xAxisData,
                                disableTicks: true,
                                disableLine: true,
                                label: "",
                                tickLabelStyle: { display: "none" },
                            },
                        ]}
                        yAxis={[
                            {
                                disableTicks: true,
                                disableLine: true,
                                label: "",
                                tickLabelStyle: { display: "none" },
                            },
                        ]}
                        series={[
                            {
                                data: seriesData,
                                color: forexColor,
                                showMark: true,
                                curve: "linear",
                                area: false,
                            },
                        ]}
                        margin={{ top: 10, bottom: 10, left: 5, right: 5 }}
                        slotProps={{ legend: { hidden: true } }}
                        sx={{
                            "& .MuiAreaElement-root": {
                                fill: forexColor,
                                opacity: 0.06,
                                transition: "fill 0.2s ease",
                            },
                            "& .MuiLineElement-root": {
                                strokeWidth: 3,
                                transition: "stroke 0.2s ease",
                            },
                        }}
                    />
                ) : (
                    <Typography sx={{ color: "gray", fontSize: "12px" }}>
                        No chart data
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default function Fund({ data }) {
    const title = "Dividen Stock Market";
    const [fund, setFund] = useState([]);

    useEffect(() => {
        setFund(data);
    }, [data]);

    return (
        <Box
            sx={{
                bgcolor: "#050816",
                minHeight: "100vh",
                overflow: "hidden",
                p: 4,
            }}
        >
            <Head title={title} />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                        fontWeight: 700,
                    }}
                >
                    {title}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {fund.map((item) => (
                    <Card key={item.uuid || item.title} item={item} />
                ))}
            </Box>
        </Box>
    );
}
