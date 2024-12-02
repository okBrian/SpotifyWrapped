import { useContext } from "react";
import FlipCard from "./FlipCard";
import { LangContext } from "./DarkModeProvider";
import { Artist } from "@/util/types";


export default function Top5Artists(props: {
  topArtists: Artist[],
}) {
  const { topArtists } = props;

  const lang = useContext(LangContext);

  return (
    <div className="max-w-full h-full flex flex-col">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>{lang.your}</p>
        <p className="text-secondary">
          {lang.top5}
        </p>
        <p>{lang.artists}:</p>
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
                  {topArtists[i].name || ""}
                </p>
                {(topArtists[i].imageUrl || "") ? (
                  <img src={topArtists[i].imageUrl} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-full rounded-lg bg-error" />
                )}
              </>
            }
            back={
              <div className="w-full -scale-x-100 flex flex-col items-start">
                <h3 className="text-xl mb-4 text-left">
                  {topArtists[i].name || ""}
                </h3>
                <p>
                  {lang.pop}:
                </p>
                <p className="text-2xl text-primary mb-4">
                  {topArtists[i].popularity}%
                </p>
              </div>
            }
          />
        )}
      </div>
    </div>
  )
}
