import FlipCard from "./FlipCard";
import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";
import { Album } from "@/util/types";


export default function Top5Albums(props: {
  topAlbums: Album[],
}) {
  const { topAlbums } = props;

  const lang = useContext(LangContext);
  console.log(topAlbums);
  return (
    <div className="max-w-full h-full flex flex-col">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>{lang.your}</p>
        <p className="text-secondary">
          {lang.top5}
        </p>
        <p>Albums</p>
      </div>
      
      <div className="flex gap-4 overflow-x-scroll px-3 py-6 grow">
        {[...Array(5)].map((_, i) =>
          <FlipCard
            key={i}
            front={
              <>
                <p className="text-2xl font-bold">
                  {i + 1}
                </p>
                <p className="text-lg mb-4">
                  {topAlbums[i].name || ""}
                </p>
                {(topAlbums[i].imageUrl || "") ? (
                  <img src={topAlbums[i].imageUrl} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-full rounded-lg bg-error" />
                )}
              </>
            }
            back={
              <div className="w-full -scale-x-100 flex flex-col items-start">
                <h3 className="text-xl mb-4">
                  {topAlbums[i].name || ""}
                </h3>
                <p>
                  Favorite Track:
                </p>
                <p className="text-2xl text-primary mb-4">
                  {topAlbums[i].userFavTrack || ""}
                </p>
              </div>
            }
          />
        )}
      </div>
    </div>
  )
}
