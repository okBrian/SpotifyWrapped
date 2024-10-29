"use client"; // This makes the component a Client Component

import React, { useEffect, useState } from 'react';

const SpotifyLogin: React.FC = () => {
    const [authUrl, setAuthUrl] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Fetch the authentication URL when the component mounts
    useEffect(() => {
        const fetchAuthUrl = async () => {
            try {
                const response = await fetch('http://localhost:8000/spotify/get-auth-url');
                const data = await response.json();
                setAuthUrl(data.url);
                console.log('Auth URL fetched:', data.url);
            } catch (error) {
                console.error('Error fetching auth URL:', error);
                console.log("Error occurred fetching")
            }
        };

        fetchAuthUrl();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/spotify/get-data/${'artists'}`, {
                    credentials: 'include', // Include credentials (cookies) in the request
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                console.log("Error occurred fetching")
            }
        };

        fetchData();
    }, []);

    // Check if the user is authenticated when the component mounts
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('http://localhost:8000/spotify/is-authenticated', {
                    credentials: 'include', // Include credentials (cookies) in the request
                });
                const data = await response.json();
                setIsAuthenticated(data.status);
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuthentication();
    }, []);

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px', textAlign: 'center', color: 'black' }}>
            <h1>Spotify Login</h1>
            {!isAuthenticated ? (
                <div>
                    <p style={{ fontSize: '18px', color: 'red' }}>You are not logged in. Click below to log in.</p>
                    {authUrl && (
                        <a href={authUrl}>
                            <button style={{
                                padding: '10px 20px',
                                fontSize: '18px',
                                backgroundColor: '#1DB954', // Spotify green color
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}>
                                Login with Spotify
                            </button>
                        </a>
                    )}
                </div>
            ) : (
                <p style={{ fontSize: '18px', color: 'green' }}>You are logged in with Spotify!</p>
            )}
        </div>
    );
};

export default SpotifyLogin;
