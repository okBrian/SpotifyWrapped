import { useContext } from "react";
import ArtistBlock from "./ArtistBlock";
import { LangContext } from "./DarkModeProvider";


export default function Top5Artists(props: {
  topArtists: string[][],
}) {
  const { topArtists } = props;

  const lang = useContext(LangContext);

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>{lang.your}</p>
        <p className="text-secondary">
          {lang.top5}
        </p>
        <p>{lang.artists}</p>
      </div>
      
      <div className="flex gap-4 overflow-x-scroll px-3 py-6">
        {[...Array(5)].map((_, i) =>
          <ArtistBlock key={i} num={i + 1} artist={topArtists[i][0] || ""} imageUrl={topArtists[i][1] || ""} fav_track={topArtists[i][2] || ""}/>
        )}
      </div>
    </div>
  )
}
