import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";

export default function Diversity(props: {
  diversity: number,
}) {
  const { diversity } = props;

  const lang = useContext(LangContext);

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>{lang.how}</p>
        <p className="text-secondary">
          {lang.diverse}
        </p>
        <p>{lang.isYourMusic}?</p>
      </div>
      <p className="text-5xl font-bold text-primary mt-8">
        {(diversity * 3).toFixed(1)}%
      </p>
      <p className="text-2xl text-primary mt-12">
        {lang.youHaveA} {diversity < 5 ? lang.monolithic : diversity < 10 ? lang.consistent : diversity < 20 ? lang.balanced : diversity < 30 ? lang.diverse2 : lang.universal} {lang.musicTaste}.
      </p>
    </div>
  )
}
