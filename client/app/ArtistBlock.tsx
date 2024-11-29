"use client"

import { useContext, useEffect, useState } from "react";
import { LangContext } from "./DarkModeProvider";


export default function ArtistBlock(props: {
    num: number,
    artist: string,
    imageUrl: string,
}) {
  const { num, artist, imageUrl} = props;

  const [flipped, setFlipped] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const lang = useContext(LangContext);

  useEffect(() => {
    if (flipped) {
      setTimeout(() => {
        setShowBack(true);
      }, 120);
    } else {
      setTimeout(() => {
        setShowBack(false);
      }, 120);
    }
  }, [flipped]);

  return (
    <button
      className="min-w-72 h-90 group"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`w-full h-full flex flex-col items-start rounded-xl bg-faint-gray-light dark:bg-faint-gray-dark p-4 transition duration-300 group-hover:scale-y-[1.05] group-hover:cursor-pointer ${flipped ? "-scale-x-100 group-hover:-scale-x-[1.05]" : "scale-x-100 group-hover:scale-x-[1.05]"}`}>

        {showBack ? <div className="w-full -scale-x-100 flex flex-col items-start">
          <h3 className="text-xl mb-4">
            {artist}
          </h3>
          <p>
            {lang.minutesListened}:
          </p>
          <p className="text-2xl text-primary mb-4">
            20,000
          </p>
          <p>
            Unique songs listened:
          </p>
          <p className="text-2xl text-primary">
            100
          </p>
        </div> : <>
          <p className="text-2xl font-bold">
            {num}
          </p>
          <p className="text-lg mb-4">
            {artist}
          </p>
          {imageUrl ? (
            <img src={imageUrl} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="w-full h-full rounded-lg bg-error" />
          )}
        </>}
      </div>
    </button>
  )
}
