"use client"

import { ReactNode, useEffect, useState } from "react";


export default function FlipCard(props: {
  front: ReactNode,
  back: ReactNode,
}) {
  const { front, back } = props;

  const [flipped, setFlipped] = useState(false);
  const [showBack, setShowBack] = useState(false);

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
        {showBack ? back : front}
      </div>
    </button>
  )
}
