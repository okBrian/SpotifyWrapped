"use client"; // This makes the component a Client Component

import { Button } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import { LangContext } from '../DarkModeProvider';


export default function Login() {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const lang = useContext(LangContext);

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
        console.log("Error happened fetching")
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
    <div className="w-full h-full relative overflow-hidden pt-32">
      <div className="flex flex-wrap gap-2 text-5xl w-min whitespace-nowrap mb-12">
        <p className="z-10">
          {lang.your}
        </p>
        <p className="text-secondary z-10">
          2024
        </p>
        <p className="z-10">
          Spotify Wrapped
        </p>
      </div>
      {authUrl ? (
        <a href={authUrl}>
          <Button
            className="bg-variant rounded-lg text-white z-10"
          >
            {lang.loginWith} Spotify
          </Button>
        </a>
      ) : (
        <Button
          className="bg-variant rounded-lg text-white z-10"
        >
          {lang.loginWith} Spotify
        </Button>
      )}

      <p className="absolute bottom-0 right-0 text-faint-gray-light dark:text-faint-gray-dark select-none text-[15rem] md:text-[40rem] font-bold leading-none pb-48">
        24
      </p>
    </div>
  )
}
