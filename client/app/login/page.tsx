"use client"; // This makes the component a Client Component

import { useEffect, useState } from 'react';



export default function Login() {

    const [authUrl, setAuthUrl] = useState<string | null>(null);
    const [displayName, setDisplayName] = useState<string | null>(null);
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
        console.log("Error happend fetching")
      }
    };


    fetchAuthUrl();
    }, []);
      
    useEffect(() => {
      const fetchData = async () => {
          const query = "me"
          try {
              const response = await fetch(`http://localhost:8000/spotify/get-data/${query}`, {
                  credentials: 'include', // Include credentials (cookies) in the request
              });
              const data = await response.json();
              setDisplayName(data.display_name);

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
    <div className="h-full p-6 text-center">
      <h1 className="text-3xl mb-10">
        Spotify Login
      </h1>
      {!isAuthenticated ? (
        <div>
          <p className="text-xl font-red-500">You are not logged in. Click below to log in.</p>
          {authUrl && (
            <a href={authUrl}>
              <button className="px-6 py-3 text-lg bg-spotify-green rounded-lg mt-6">
                Login with Spotify
              </button>
            </a>
          )}
        </div>
      ) : (
        <p className="text-xl font-green-500">Welcome, {displayName}! You are logged in with Spotify!</p>
      )}
    </div>
    );
};
