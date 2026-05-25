import { useState, useEffect, useRef } from "react";

import { Box, Typography } from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { QRCodeSVG } from "qrcode.react";

import { Head } from "@inertiajs/react";

const CARD_HEIGHT = 500;
const CARD_GAP = 130;
const TOTAL_CARD_SIZE = CARD_HEIGHT + CARD_GAP;

export default function Income({ data }) {
    const title = "Income";

    const [items, setItems] = useState([]);

    const [countdown, setCountdown] = useState(10);

    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const [isSpinning, setIsSpinning] = useState(false);

    const [translateY, setTranslateY] = useState(0);

    const [transitionStyle, setTransitionStyle] = useState("none");

    const [blurEffect, setBlurEffect] = useState(0);

    const [spinItems, setSpinItems] = useState([]);

    const [lastFinalIndex, setLastFinalIndex] = useState(null);

    const timerRef = useRef(null);

    useEffect(() => {
        if (data?.length) {
            setItems(data);

            setSpinItems([
                data[0],
                data[1 % data.length],
                data[2 % data.length],
            ]);
        }
    }, [data]);

    useEffect(() => {
        if (items.length <= 1) return;

        if (isTimerRunning) {
            timerRef.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);

                        setIsTimerRunning(false);

                        startSpin();

                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [isTimerRunning, items]);

    const startSpin = () => {
        if (items.length <= 1) return;

        setIsSpinning(true);

        setBlurEffect(10);

        let finalIndex;

        do {
            finalIndex = Math.floor(Math.random() * items.length);
        } while (items.length > 1 && finalIndex === lastFinalIndex);

        setLastFinalIndex(finalIndex);

        const generated = [];

        const totalCards = 40;

        let lastRandomIndex = -1;

        for (let i = 0; i < totalCards; i++) {
            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * items.length);
            } while (items.length > 1 && randomIndex === lastRandomIndex);

            generated.push(items[randomIndex]);

            lastRandomIndex = randomIndex;
        }

        generated[generated.length - 1] = items[finalIndex];

        setSpinItems(generated);

        setTransitionStyle("none");

        setTranslateY(0);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const finalTranslate = -(
                    (generated.length - 3) *
                    TOTAL_CARD_SIZE
                );

                setTransitionStyle(
                    "transform 5s cubic-bezier(0.08, 0.82, 0.17, 1)",
                );

                setTranslateY(finalTranslate);

                setTimeout(() => {
                    setBlurEffect(0);

                    const finalCards = [
                        generated[generated.length - 3],
                        generated[generated.length - 2],
                        generated[generated.length - 1],
                    ];

                    setSpinItems(finalCards);

                    setTransitionStyle("none");

                    setTranslateY(-(TOTAL_CARD_SIZE * 2));

                    setIsSpinning(false);

                    setCountdown(10);

                    setIsTimerRunning(true);
                }, 5000);
            });
        });
    };

    const card = (i, index) => {
        return (
            <Box
                key={`${i.id}-${index}`}
                sx={{
                    width: "600px",
                    height: `${CARD_HEIGHT}px`,
                    bgcolor: "#233759",
                    p: 3,
                    borderRadius: "20px",
                    border: "solid 3px #00f3ff",
                    boxShadow: `
                        0 0 5px #fff,
                        0 0 20px #00f3ff,
                        0 0 40px #00a2ff
                    `,
                    flexShrink: 0,
                }}
            >
                {/* TOP */}
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
                                sx={{
                                    fontSize: "30px",
                                    color: "#00f3ff",
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "22px",
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
                        }}
                    >
                        <QRCodeSVG value={i.uuid || "N/A"} size={100} />
                    </Box>
                </Box>

                {/* LOAN + CF */}
                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "#ffffff1a",
                            p: 2,
                            borderRadius: "12px",
                            width: "50%",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#a9a9a9",
                                fontSize: "14px",
                            }}
                        >
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
                        <Typography
                            sx={{
                                color: "#54c4ad",
                                fontSize: "14px",
                            }}
                        >
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

                {/* COST + ENERGY */}
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "#ffffff1a",
                            p: 2,
                            borderRadius: "12px",
                            width: "50%",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#a9a9a9",
                                fontSize: "14px",
                            }}
                        >
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
                        <Typography
                            sx={{
                                color: "#a9a9a9",
                                fontSize: "14px",
                            }}
                        >
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

                {/* MARKET */}
                <Box sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            bgcolor: "#ffffff1a",
                            p: 2,
                            borderRadius: "12px",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#a9a9a9",
                                fontSize: "14px",
                            }}
                        >
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

                <Typography
                    sx={{
                        color: isSpinning ? "#ff0055" : "#00f3ff",
                        fontWeight: "bold",
                        fontSize: "18px",
                    }}
                >
                    {isSpinning ? "Spinning..." : `Next spin in ${countdown}s`}
                </Typography>
            </Box>

            <Box
                sx={{
                    height: "700px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "620px",
                        height: `${CARD_HEIGHT}px`,
                        zIndex: 5,
                        pointerEvents: "none",
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: `${CARD_GAP}px`,
                        alignItems: "center",
                        transform: `translateY(${translateY}px)`,
                        transition: transitionStyle,
                        filter: `blur(${blurEffect}px)`,
                        willChange: "transform",
                        pt: "7%",
                    }}
                >
                    {spinItems.map((x, index) => card(x, index))}
                </Box>
            </Box>
        </Box>
    );
}
