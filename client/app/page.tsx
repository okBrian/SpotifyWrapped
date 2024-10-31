"use client"; // This makes the component a Client Component

import ArtistBlock from "./ArtistBlock";
import UserBlock from "./UserBlock";

import { useEffect, useState } from 'react';


export default function Home() {

  const [displayName, setDisplayName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [topArtists, setTopArtists] = useState<string[]>(["John Doe", "John Doe", "John Doe", "John Doe", "John Doe"]);
  const [topGenre, setTopGenre] = useState<string | null>(null);

  // const [topArtistImages, setTopArtistImages] = useState<string[]>(["", "", "", "", ""]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataUser = await userResponse.json();
        setDisplayName(dataUser.display_name);
        setUserImage(dataUser.images[0].url)

        const genreResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|top|genres"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataGenre = await genreResponse.json();
        setTopGenre(dataGenre.genres[0][0]);

        const artistsResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|top|artists?limit=5"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        let dataArtists = await artistsResponse.json();
        dataArtists = dataArtists.items.map((item: any) => [item.name, item.images[0].url]);
        setTopArtists(dataArtists);

      } catch (error) {
        console.error('Error fetching user data:', error);
        console.log("Error occurred fetching")
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[40rem] max-w-full pt-16">
      <div className="flex mb-8">
        <div className="flex flex-col grow">
          <UserBlock username={displayName || ""} className="grow mb-16" userImage={userImage || ""}/>
          <div className="flex flex-wrap gap-1 text-3xl">
            <p>Your</p>
            <p className="text-secondary">
              Top 5
            </p>
            <p>Artists</p>
          </div>
        </div>

        <div className="flex flex-col items-end whitespace-nowrap">
          <p className="text-lg">
            Minutes listened:
          </p>
          <p className="text-2xl text-primary mb-4">
            100,000
          </p>
          <p className="text-lg">
            Top Genre:
          </p>
          <p className="text-2xl text-primary">
            {topGenre || ""}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 overflow-x-scroll">
        {[...Array(5)].map((_, i) =>
          <ArtistBlock key={i} num={i + 1} artist={topArtists[i][0] || ""} imageUrl={topArtists[i][1] || ""}/>
        )}
      </div>
    </div>
  )
}
