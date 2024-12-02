"use client"; // This makes the component a Client Component

import UserBlock from "./UserBlock";
import { useContext, useEffect, useState } from 'react';
import { DEFAULT_WRAPPED, WrappedInfo } from "@/util/types";
import Wrapped from "./Wrapped";
import { parseWrapped } from "@/util/helpers";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { LangContext } from "./DarkModeProvider";


export default function Home() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [wrappedInfo, setWrappedInfo] = useState<WrappedInfo>(DEFAULT_WRAPPED);
  const [loggedIn, setLoggedIn] = useState(false);

  const { push } = useRouter();
  const lang = useContext(LangContext);

  const generate = () => {
    (async () => {
      const newWrappedRes = await fetch("http://localhost:8000/spotify/create-wrapped", {
        credentials: "include",
      });
      const newWrappedData = await newWrappedRes.json();
      setWrappedInfo({...parseWrapped(newWrappedData)});
      console.log("Pressed generate button, new wrapped:");
      console.log(newWrappedData);
    })();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetching username and profile picture
        const userRes = await fetch("http://localhost:8000/spotify/get-data/me", {
          credentials: "include", // Include credentials (cookies) in the request
        });
        const userData = await userRes.json();
        setDisplayName(userData.display_name);
        if (userData.images && userData.images[0]) {
          setUserImage(userData.images[0].url);
        }

        // fetching all wrappeds
        const wrappedsRes = await fetch("http://localhost:8000/spotify/get-wrappeds", {
          credentials: "include",
        });
        const wrappedsData = await wrappedsRes.json();
        // if there are no wrappeds, generate one
        if (wrappedsData.items.length === 0) {;
          const newWrappedRes = await fetch("http://localhost:8000/spotify/create-wrapped", {
            credentials: "include",
          });
          const newWrappedData = await newWrappedRes.json();
          setWrappedInfo({...parseWrapped(newWrappedData)});
          console.log("New wrapped:");
          console.log(newWrappedData);
        } else {
          setWrappedInfo({...parseWrapped(wrappedsData.items[0])});
          console.log("All past wrappeds:");
          console.log(wrappedsData.items);
        }
        setLoggedIn(true);

      } catch (error) {
        console.error("Error fetching user data:", error);
        console.log("Error occurred fetching")
        push("/login");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {loggedIn && <>
        <div className="flex mb-16 items-center w-full max-w-[35rem]">
          <UserBlock username={displayName || ""} className="grow" userImage={userImage || ""}/>
          <Button
            onPress={() => generate()}
            className="bg-primary rounded-lg font-bold text-white"
          >
            {lang.generateNew}
          </Button>
        </div>
        <Wrapped wrapped={wrappedInfo} />
      </>}
    </div>
  )
}
