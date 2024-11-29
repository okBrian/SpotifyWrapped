"use client"; // This makes the component a Client Component

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

// Helper function to get CSRF token from cookies
const getCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : null;
};

export default function HigherOrLowerGame() {
    const [question, setQuestion] = useState<string | null>(null);
    const [gameScore, setGameScore] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const [artistName, setArtistName] = useState<string | null>(null);
    const [otherArtistName, setOtherArtistName] = useState<string | null>(null);
    const [artistFollowers, setArtistFollowers] = useState<number | null>(null);
    const [otherArtistFollowers, setOtherArtistFollowers] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchQuestion = async () => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const response = await fetch("http://localhost:8000/games/higher-or-lower", {
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
            const csrfToken = getCsrfToken();  // Get CSRF token from the cookie
            console.log("CSRF Token:", csrfToken);  // Debugging line
            const response = await fetch("http://localhost:8000/games/higher-or-lower", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken || "",  // Ensure CSRF token is sent
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
                if (data.question) {
                    setQuestion(data.question);
                    setGameScore(data.game_score);
                    setArtistName(data.artist_name);
                    setOtherArtistName(data.other_artist_name);
                    setArtistFollowers(data.artist_followers);
                    setOtherArtistFollowers(data.other_artist_followers);
                } else {
                    setQuestion(data.message || "Game Over. Try again!");
                }
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
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl mb-4 font-bold">Higher or Lower</h1>
            {loading ? (
                <p>Loading...</p>
            ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : (
                <>
                    <p className="mb-4 text-center">{question}</p>
                    <div className="flex gap-4">
                        <Button
                            onPress={() => submitAnswer("higher")}
                            className="bg-success rounded-lg text-white"
                        >
                            Higher
                        </Button>
                        <Button
                            onPress={() => submitAnswer("lower")}
                            className="bg-danger rounded-lg text-white"
                        >
                            Lower
                        </Button>
                    </div>
                    <p className="mt-4">Current Score: {gameScore}</p>
                </>
            )}
        </div>
    );
}
