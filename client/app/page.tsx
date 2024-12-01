"use client"; // This makes the component a Client Component

import UserBlock from "./UserBlock";
import { useEffect, useState } from 'react';
import { DEFAULT_WRAPPED, WrappedInfo } from "@/util/types";
import Wrapped from "./Wrapped";
import Footer from "./Footer"


export default function Home() {
  const [displayName, setDisplayName] = useState<string | null>("John Doe");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [wrappedInfo, setWrappedInfo] = useState<WrappedInfo>(DEFAULT_WRAPPED);

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
        wrappedInfo.topGenres = dataGenres;

        // fetching genre diversity score
        const genreDiversityResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|genre_diversity"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataGenreDiversity = await genreDiversityResponse.json();
        wrappedInfo.genreDiversity = dataGenreDiversity;

        // fetching most recently played track
        const trackResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|player|recently-played?limit=1"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataTrack = await trackResponse.json();
        wrappedInfo.recentTrack = `${dataTrack.items[0].track.name} by ${dataTrack.items[0].track.artists[0].name}`;

        // fetching top albums
        const albumsResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|top|albums"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataAlbums = await albumsResponse.json();
        wrappedInfo.topAlbums = dataAlbums;

        // fetching top artists
        const artistsResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|top|artists?limit=5"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        let dataArtists = await artistsResponse.json();
        dataArtists = dataArtists.items.map((item: any) => [item.name, item.images[0].url, item.fav_track]);
        wrappedInfo.topArtists = dataArtists;

        // fetching user description
        const descriptionResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|description"}`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        const dataDescription = await descriptionResponse.json();
        wrappedInfo.userDescription = dataDescription;

        setWrappedInfo({...wrappedInfo});

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
      <Wrapped wrapped={wrappedInfo} />
      <Footer topArtists={wrappedInfo.topArtists}></Footer>
    </div>
  )
}
