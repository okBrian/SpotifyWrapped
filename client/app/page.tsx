"use client"; // This makes the component a Client Component

import ArtistBlock from "./ArtistBlock";
import Carousel from "./Carousel";
import LastPlayed from "./LastPlayed";
import Top5Artists from "./Top5Artists";
import UserBlock from "./UserBlock";

import { useEffect, useState } from 'react';


export default function Home() {
  const [displayName, setDisplayName] = useState<string | null>("John Doe");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [topArtists, setTopArtists] = useState<string[][]>([
    ["John Doe", ""],
    ["John Doe", ""],
    ["John Doe", ""],
    ["John Doe", ""],
    ["John Doe", ""],
  ]);
  const [topGenre, setTopGenre] = useState<string | null>(null);
  const [recentTrack, setRecentTrack] = useState<string | null>(null);

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

        const trackResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|player|recently-played?limit=1"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataTrack = await trackResponse.json();
        setRecentTrack(dataTrack.items[0].track.name + " by " + dataTrack.items[0].track.artists[0].name);

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
    <div className="w-full">
      <UserBlock username={displayName || ""} className="grow mb-16" userImage={userImage || ""}/>

      <Carousel slides={[
        <Top5Artists topArtists={topArtists} />,
        <LastPlayed recentTrack={recentTrack ?? ""} topGenre={topGenre ?? ""} />
      ]} />
    </div>
  )
}
