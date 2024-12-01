"use client"
import { DEFAULT_WRAPPED, WrappedInfo } from "@/util/types";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import UserBlock from "../UserBlock";
import Wrapped from "../Wrapped";
import CenteredModal from "../CenteredModal";

export default function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [wrappeds, setWrappeds] = useState<WrappedInfo[]>([]);
  const [wrappedOpen, setWrappedOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    (async () => {
      // fetching username
      // const userResponse = await fetch(`http://localhost:8000/spotify/get-data/${"me|top|features"}`, {
      //   credentials: 'include', // Include credentials (cookies) in the request
      // });
      // const dataUser = await userResponse.json();
      // setDisplayName(dataUser.display_name);
      // setUserImage(dataUser.images[0].url);

      const wrappedsResponse = await fetch(`http://localhost:8000/spotify/get-wrappeds`, {
        credentials: 'include',
      })
      const wrappedsData = await wrappedsResponse.json();
      console.log(wrappedsData);
      // const wrappeds = wrappedsData.map(w => {
      //   
      // });

      setWrappeds([
        DEFAULT_WRAPPED,
        DEFAULT_WRAPPED,
        DEFAULT_WRAPPED,
      ]);
    })();

    // TODO: fetch displayName, userImage, and wrapped information
  }, []);

  const handleDelete = () => {
    // TODO: fetch endpoint for deleting account
    console.log("delete pressed");
  }

  const openWrapped = (index: number) => {
    setOpenIndex(index);
    setWrappedOpen(true);
  }

  return (
    <div className="w-full mx-auto flex flex-col items-center gap-4 max-w-96 w-96">
      <h1 className="text-center text-3xl font-bold">
        Profile
      </h1>
      <div className="flex flex-col items-center gap-2 w-full">
        <UserBlock username={displayName} userImage={userImage} className="w-full" />
        <Button
          onPress={() => handleDelete()}
          className="bg-red-600 rounded-lg font-bold text-white"
        >
          Delete Account
        </Button>
      </div>

      <h2 className="text-center text-xl font-bold mt-12">
        Past Wrappeds
      </h2>
      <div className="flex flex-col divide-y divide-light-border dark:divide-dark-border w-full">
        {wrappeds.map((_, i) =>
          <div key={i}>
            <Button
              onPress={() => openWrapped(i)}
              className="h-16 bg-faint-gray-light dark:bg-faint-gray-dark rounded-lg w-full justify-start"
            >
              Wrapped
            </Button>
          </div>
        )}
      </div>

      <CenteredModal
        isOpen={wrappedOpen}
        setIsOpen={setWrappedOpen}
        className="p-12 rounded-xl w-full max-w-[60rem]"
      >
        <Wrapped wrapped={wrappeds[openIndex]} />
      </CenteredModal>
    </div>
  );
}
