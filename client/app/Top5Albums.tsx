import ArtistBlock from "./ArtistBlock";
import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";


export default function Top5Albums(props: {
  topAlbums: string[][],
}) {
  const { topAlbums } = props;

  const lang = useContext(LangContext);

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>{lang.your}</p>
        <p className="text-secondary">
          {lang.top5}
        </p>
        <p>Albums</p>
      </div>
      
      <div className="flex gap-4 overflow-x-scroll px-3 py-6">
        {[...Array(5)].map((_, i) =>
          <ArtistBlock key={i} num={i + 1} artist={topAlbums[i][0] || ""} imageUrl={topAlbums[i][1] || ""} fav_track={topAlbums[i][2] || "err"}/>
        )}
      </div>
    </div>
  )
}
