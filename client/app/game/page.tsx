"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

const getCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : null;
};

export default function HigherOrLowerGame() {
    const [question, setQuestion] = useState<string | null>(null);
    const [gameScore, setGameScore] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [leaderboard, setLeaderboard] = useState<any[]>([]); // to store leaderboard data
    const [leaderboardLoaded, setLeaderboardLoaded] = useState<boolean>(false); // track leaderboard data load

    const [artistName, setArtistName] = useState<string | null>(null);
    const [otherArtistName, setOtherArtistName] = useState<string | null>(null);
    const [artistFollowers, setArtistFollowers] = useState<number | null>(null);
    const [otherArtistFollowers, setOtherArtistFollowers] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Fetch the leaderboard data
    const fetchLeaderboard = async () => {
        try {
            const response = await fetch("http://localhost:8000/games/leaderboard/", {
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data['leaderboard'])
                if (data['leaderboard'].length > 0) {
                    setLeaderboardLoaded(true);
                } else {
                    setLeaderboardLoaded(false)
                }
                setLeaderboard(data['leaderboard']);
                console.log(leaderboard.length)
            } else {
                setErrorMessage(data.message || "Failed to load leaderboard.");
            }
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            setErrorMessage("Failed to load leaderboard. Please try again later.");
        }
    };

    const fetchQuestion = async () => {
        setLoading(true);
        setErrorMessage(null);
        setGameOver(false);

        try {
            const response = await fetch("http://localhost:8000/games/higher-or-lower/", {
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                setQuestion(data.question);
                setGameScore(data.game_score);
                setArtistName(data.artist_name);
                setOtherArtistName(data.other_artist_name);
                setArtistFollowers(data.artist_followers);
                setOtherArtistFollowers(data.other_artist_followers);
            } else {
                setQuestion(data.message || "Unable to load the game.");
            }
        } catch (error) {
            console.error("Error fetching game data:", error);
            setErrorMessage("Failed to load the game. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const submitAnswer = async (answer: "higher" | "lower") => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const csrfToken = getCsrfToken();

            const response = await fetch("http://localhost:8000/games/higher-or-lower/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken || "",
                },
                body: JSON.stringify({
                    answer,
                    artist_name: artistName,
                    other_artist_name: otherArtistName,
                    artist_followers: artistFollowers,
                    other_artist_followers: otherArtistFollowers,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                if (data.game_over) {
                    setGameOver(true);
                    setQuestion(data.message);
                    setGameScore(data.game_score); // Final score
                } else {
                    setGameOver(false);
                    setQuestion(data.question);
                    setGameScore(data.game_score);
                    setArtistName(data.artist_name);
                    setOtherArtistName(data.other_artist_name);
                    setArtistFollowers(data.artist_followers);
                    setOtherArtistFollowers(data.other_artist_followers);
                }
                fetchLeaderboard();
            } else {
                setErrorMessage(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
            setErrorMessage("Failed to submit your answer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestion();
        fetchLeaderboard();
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-white">
            <h1 className="text-3xl mb-6 font-bold text-center">Higher or Lower</h1>

            {loading ? (
                <p>Loading...</p>
            ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : gameOver ? (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-center">{question}</p>
                    <p className="mt-2">Final Score: {gameScore}</p>
                    <Button
                        onPress={fetchQuestion}
                        className="bg-primary rounded-lg text-white"
                    >
                        Retry
                    </Button>
                </div>
            ) : (
                <>
                    <p className="mb-4 text-center text-xl">{question}</p>
                    <div className="flex gap-4 mb-6">
                        <Button
                            onPress={() => submitAnswer("higher")}
                            className="bg-green-500 rounded-lg text-white"
                        >
                            More
                        </Button>
                        <Button
                            onPress={() => submitAnswer("lower")}
                            className="bg-red-500 rounded-lg text-white"
                        >
                            Less
                        </Button>
                    </div>
                    <p className="mt-4 text-center text-lg">Current Score: {gameScore}</p>
                </>
            )}

            {/* Leaderboard Section */}
            <div className="leaderboard-container mt-8 bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
                {leaderboardLoaded ? (
                    <div className="mt-4">
                        {leaderboard.map((entry, index) => (
                            <p key={index} className="text-lg text-white">
                                {entry.username}: {entry.score}
                            </p>
                        ))}
                    </div>
                ) : (
                    <p className="text-white">No leaderboard data available</p>
                )}
            </div>
        </div>
    );
}
