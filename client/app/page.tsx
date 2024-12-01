"use client"; // This makes the component a Client Component

import Carousel from "./Carousel";
import LastPlayed from "./LastPlayed";
import Top5Albums from "./Top5Albums";
import Top5Artists from "./Top5Artists";
import TopGenre from "./TopGenre";
import UserDescription from "./UserDescription";
import UserBlock from "./UserBlock";

import { useEffect, useState } from 'react';
import { data } from "framer-motion/client";



export default function Home() {
  const [displayName, setDisplayName] = useState<string | null>("John Doe");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [genreDiversity, setGenreDiversity] = useState<number | null>(null);
  const [topArtists, setTopArtists] = useState<string[][]>([
    ["John Doe", ""],
    ["John Doe", ""],
    ["John Doe", ""],
    ["John Doe", ""],
    ["John Doe", ""],
  ]);
  const [topAlbums, setTopAlbums] = useState<string[][]>([
    ["Album 1", "", ""],
    ["Album 2", "", ""],
    ["Album 3", "", ""],
    ["Album 4", "", ""],
    ["Album 5", "", ""],
  ]);
  const [topGenres, setTopGenres] = useState<string[][]>([
    [""],
    [""],
    [""],
    [""],
    [""],
  ]);
  const [recentTrack, setRecentTrack] = useState<string | null>(null);
  const [userDescription, setUserDescription] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        // fetching username
        const userResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataUser = await userResponse.json();
        setDisplayName(dataUser.display_name);
        if (dataUser.images && dataUser.images[0]) {
          setUserImage(dataUser.images[0].url);
        }

        // fetching top genres
        const genreResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|top|genres"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataGenres = await genreResponse.json();
        setTopGenres(dataGenres);

        // fetching genre diversity score
        const genreDiversityResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|genre_diversity"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataGenreDiversity = await genreDiversityResponse.json();
        setGenreDiversity(dataGenreDiversity);

        // fetching most recently played track
        const trackResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|player|recently-played?limit=1"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataTrack = await trackResponse.json();
        setRecentTrack(dataTrack.items[0].track.name + " by " + dataTrack.items[0].track.artists[0].name);

        // fetching top albums
        const albumsResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|top|albums"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataAlbums = await albumsResponse.json();
        setTopAlbums(dataAlbums)

        // fetching top artists
        const artistsResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|top|artists?limit=5"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        let dataArtists = await artistsResponse.json();
        dataArtists = dataArtists.items.map((item: any) => [item.name, item.images[0].url, item.fav_track]);
        setTopArtists(dataArtists)

        // fetching user description
        const descriptionResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|description"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataDescription = await descriptionResponse.json();
        setUserDescription(dataDescription)

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
        <Top5Albums topAlbums={topAlbums} />,
        <LastPlayed recentTrack={recentTrack ?? ""} />,
        <TopGenre topGenres={topGenres ?? ""} genreDiversity={genreDiversity ?? 50} />,
        <UserDescription description={userDescription ?? ""} />,
      ]} />
    </div>
  )
}
