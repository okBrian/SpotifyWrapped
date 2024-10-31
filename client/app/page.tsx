"use client"; // This makes the component a Client Component

import ArtistBlock from "./ArtistBlock";
import UserBlock from "./UserBlock";

import { useEffect, useState } from 'react';


export default function Home() {

  const [displayName, setDisplayName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [topArtists, setTopArtists] = useState<string[]>(["John Doe", "John Doe", "John Doe", "John Doe", "John Doe"]);

  // const [topArtistImages, setTopArtistImages] = useState<string[]>(["", "", "", "", ""]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/spotify/get-data/${"me"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const data = await response.json();
        setDisplayName(data.display_name);
        setUserImage(data.images[0].url)
        const response2 = await fetch(`http://localhost:8000/spotify/get-data/${"me|top|artists?limit=5"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        let dataArtists = await response2.json();
        dataArtists = dataArtists.items.map((item: any) => [item.name, item.images[0].url]);
        setTopArtists(dataArtists);
        // setTopArtistImages(dataImages);
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
            RnB
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
