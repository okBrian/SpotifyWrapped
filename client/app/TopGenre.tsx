import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";


export default function TopGenre(props: {
    topGenres: string[][],
    genreDiversity: number | null,
}) {
  const { topGenres, genreDiversity } = props;

  const lang = useContext(LangContext);

  return (
      <div className="max-w-full">
          <div className="flex flex-wrap gap-2 text-3xl">
              <p>{lang.your}</p>
              <p className="text-secondary">
                  Top
              </p>
              <p>Genres:</p>
          </div>
          <p className="text-2xl text-primary mt-8">
              {topGenres[0] || "Genre"},
              {topGenres[1] || "Genre"},
              {topGenres[2] || "Genre"},
              {topGenres[3] || "Genre"},
              {topGenres[4] || "Genre"}
          </p>
          <p className="text-3xl text-secondary mt-12">
              Diversity Score: {genreDiversity}
          </p>
          <p className="text-2xl text-primary mt-8">
              You have a {genreDiversity === null ? "unknown" : genreDiversity < 5 ? "monolithic" : genreDiversity < 10 ? "consistent" : genreDiversity < 20 ? "balanced" : genreDiversity < 30 ? "diverse" : "universal"} music taste.
          </p>
      </div>
  )
}
