import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";


export default function LastPlayed(props: {
  recentTrack: string,
}) {
  const { recentTrack } = props;

  const lang = useContext(LangContext);

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>{lang.your}</p>
        <p className="text-secondary">
          Last Played
        </p>
        <p>Song:</p>
      </div>
      <p className="text-2xl text-primary mt-12">
        {recentTrack || "Song"}
      </p>
    </div>
  )
}
