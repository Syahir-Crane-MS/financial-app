import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { QRCodeSVG } from "qrcode.react";
import { Head } from "@inertiajs/react";

export default function Income({ data }) {
    const title = "Income";

    const [item, setItem] = useState([]);
    const [countdown, setCountdown] = useState(10);
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const [prevIndex, setPrevIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);

    const BASE_Y = -660;
    const [translateY, setTranslateY] = useState(BASE_Y);
    const [transitionStyle, setTransitionStyle] = useState("none");
    const [blurEffect, setBlurEffect] = useState(0);

    const timerRef = useRef(null);
    const stateRef = useRef({ currentIndex: 0, length: 0 });

    useEffect(() => {
        if (data && data.length > 0) {
            setItem(data);
            stateRef.current.length = data.length;

            setCurrentIndex(0);
            setPrevIndex(data.length - 1);
            setNextIndex(data.length > 1 ? 1 : 0);
        }
    }, [data]);

    useEffect(() => {
        if (item.length <= 1) return;

        if (isTimerRunning) {
            timerRef.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setIsTimerRunning(false);
                        startSmoothSpin();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [isTimerRunning, item.length]);

    const startSmoothSpin = () => {
        const length = stateRef.current.length;
        if (length <= 1) {
            setIsTimerRunning(true);
            setCountdown(10);
            return;
        }

        setTransitionStyle("transform 400ms ease-in-out");
        setBlurEffect(12);
        setTranslateY(0);

        let loopCount = 0;
        const maxLoops = 15;

        const runLoop = setInterval(() => {
            setTransitionStyle("none");
            setTranslateY(BASE_Y);

            const nextCurrent = (stateRef.current.currentIndex + 1) % length;
            stateRef.current.currentIndex = nextCurrent;

            setCurrentIndex(nextCurrent);
            setPrevIndex((nextCurrent - 1 + length) % length);
            setNextIndex((nextCurrent + 1) % length);

            loopCount++;

            if (loopCount >= maxLoops) {
                clearInterval(runLoop);
                triggerFinalStop(length);
            } else {
                setTimeout(() => {
                    setTransitionStyle("transform 80ms linear");
                    setTranslateY(0);
                }, 5);
            }
        }, 80);
    };

    const triggerFinalStop = (length) => {
        const finalTargetIndex = Math.floor(Math.random() * length);

        stateRef.current.currentIndex = finalTargetIndex;
        setCurrentIndex(finalTargetIndex);
        setPrevIndex((finalTargetIndex - 1 + length) % length);
        setNextIndex((finalTargetIndex + 1) % length);

        setTransitionStyle("none");
        setTranslateY(BASE_Y * 2);

        setTimeout(() => {
            setTransitionStyle(
                "transform 1.8s cubic-bezier(0.25, 1.1, 0.5, 1)",
            );
            setTranslateY(BASE_Y);
            setBlurEffect(0);

            setTimeout(() => {
                setCountdown(10);
                setIsTimerRunning(true);
            }, 1800);
        }, 30);
    };

    const card = (i, uniqueKey) => {
        if (!i) return null;

        return (
            <Box
                key={`${i.id}-${uniqueKey}`}
                sx={{
                    my: 1,
                    width: "600px",
                    height: "500px",
                    bgcolor: "#233759",
                    p: 3,
                    borderRadius: "20px",
                    border: "solid 3px #00f3ff",
                    boxShadow: `0 0 5px #fff, 0 0 20px #00f3ff, 0 0 40px #00a2ff`,
                    transition:
                        "transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.01)",
                        boxShadow: `0 0 10px #fff, 0 0 20px #00f3ff, 0 0 40px #00f3ff, 0 0 60px #00a2ff`,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ width: "70%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <AccountBalanceWalletIcon
                                sx={{ fontSize: "30px", color: "#00f3ff" }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    color: "#00f3ff",
                                }}
                            >
                                {i.title}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                color: "white",
                                mt: 1,
                                fontSize: "14px",
                                minHeight: "40px",
                            }}
                        >
                            {i.description}
                        </Typography>
                        <Typography
                            sx={{
                                p: 1,
                                bgcolor: "#ffffff59",
                                color: "white",
                                borderRadius: "20px",
                                mt: 1,
                                px: 1.5,
                                py: 0.2,
                                width: "fit-content",
                                fontSize: "12px",
                                textTransform: "capitalize",
                            }}
                        >
                            {i.level}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            bgcolor: "white",
                            p: 1.5,
                            borderRadius: "10px",
                            display: "flex",
                        }}
                    >
                        <QRCodeSVG
                            value={i.uuid || "N/A"}
                            size={100}
                            level={"H"}
                        />
                    </Box>
                </Box>

                {/* Loan + CF */}
                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Box
                        sx={{
                            bgcolor: "#ffffff1a",
                            p: 2,
                            borderRadius: "12px",
                            width: "50%",
                        }}
                    >
                        <Typography sx={{ color: "#a9a9a9", fontSize: "14px" }}>
                            Loan
                        </Typography>
                        <Typography
                            sx={{
                                color: "#ff7a7a",
                                fontSize: "22px",
                                fontWeight: 700,
                            }}
                        >
                            RM{" "}
                            {new Intl.NumberFormat("en-US", {
                                minimumFractionDigits: 2,
                            }).format(i.loan || 0)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#79c6c14d",
                            p: 2,
                            borderRadius: "12px",
                            width: "50%",
                        }}
                    >
                        <Typography sx={{ color: "#54c4ad", fontSize: "14px" }}>
                            Monthly CF
                        </Typography>
                        <Typography
                            sx={{
                                color: "#54c4ad",
                                fontSize: "22px",
                                fontWeight: 700,
                            }}
                        >
                            RM{" "}
                            {new Intl.NumberFormat("en-US", {
                                minimumFractionDigits: 2,
                            }).format(i.monthly_cf || 0)}
                        </Typography>
                    </Box>
                </Box>

                {/* Cost + Energy */}
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <Box
                        sx={{
                            bgcolor: "#ffffff1a",
                            p: 2,
                            borderRadius: "12px",
                            width: "50%",
                        }}
                    >
                        <Typography sx={{ color: "#a9a9a9", fontSize: "14px" }}>
                            Upfront Cost
                        </Typography>
                        <Typography
                            sx={{
                                color: "white",
                                fontSize: "22px",
                                fontWeight: 700,
                            }}
                        >
                            RM{" "}
                            {new Intl.NumberFormat("en-US", {
                                minimumFractionDigits: 2,
                            }).format(i.upfront_cost || 0)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#ffffff1a",
                            p: 2,
                            borderRadius: "12px",
                            width: "50%",
                        }}
                    >
                        <Typography sx={{ color: "#a9a9a9", fontSize: "14px" }}>
                            Energy Score
                        </Typography>
                        <Typography
                            sx={{
                                color: "white",
                                fontSize: "22px",
                                fontWeight: 700,
                            }}
                        >
                            {i.energy_score || 0}
                        </Typography>
                    </Box>
                </Box>

                {/* Market Value */}
                <Box sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            bgcolor: "#ffffff1a",
                            p: 2,
                            borderRadius: "12px",
                            width: "100%",
                        }}
                    >
                        <Typography sx={{ color: "#a9a9a9", fontSize: "14px" }}>
                            Market Valuation
                        </Typography>
                        <Typography
                            sx={{
                                color: "#7a91f9",
                                fontSize: "24px",
                                fontWeight: 700,
                            }}
                        >
                            RM{" "}
                            {new Intl.NumberFormat("en-US", {
                                minimumFractionDigits: 2,
                            }).format(i.market_value || 0)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    };

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

            {/* Header Section */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: 700 }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        color: isTimerRunning ? "#00f3ff" : "#ff0055",
                        fontWeight: "bold",
                        fontSize: "18px",
                    }}
                >
                    {isTimerRunning
                        ? `Next spin in ${countdown}s`
                        : "Spinning..."}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "730px",
                    overflow: "hidden",
                    position: "relative",
                    width: "100%",
                    mx: "auto",
                }}
            >
                {item.length > 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "90px",
                            transform: `translateY(${translateY}px)`,
                            transition: transitionStyle,
                            filter: `blur(${blurEffect}px)`,
                            willChange: "transform",
                        }}
                    >
                        {card(item[prevIndex], "prev")}
                        {card(item[currentIndex], "current")}
                        {card(item[nextIndex], "next")}
                    </Box>
                ) : (
                    <Typography sx={{ color: "gray", p: 4 }}>
                        No items available
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
