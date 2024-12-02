import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";
import { Genre } from "@/util/types";


export default function TopGenre(props: {
  topGenres: Genre[],
}) {
  const { topGenres } = props;

  const lang = useContext(LangContext);

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>{lang.your}</p>
        <p className="text-secondary">
          {lang.top}
        </p>
        <p>{lang.genres}:</p>
      </div>
      <p className="text-2xl text-primary mt-8">
        {topGenres.map(g => g.name.toLowerCase()
          .split(' ')
          .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')).join(", ")}
      </p>
    </div>
  )
}
