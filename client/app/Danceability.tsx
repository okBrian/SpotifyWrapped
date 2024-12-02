import { useContext } from "react";
import FillBar from "./FillBar";
import { LangContext } from "./DarkModeProvider";


export default function Danceability() {
  const lang = useContext(LangContext);

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>{lang.how}</p>
        <p className="text-secondary">
          {lang.danceable}
        </p>
        <p>{lang.isYourMusic}?</p>
      </div>
      <div className="flex flex-col gap-4 mt-12">
        <div className="flex gap-6 items-center">
          <p className="text-2xl text-primary w-48">
            {lang.danceability}:
          </p>
          <FillBar width="w-3/5" />
        </div>
        
        <div className="flex gap-6 items-center">
          <p className="text-2xl text-primary w-48">
            {lang.energy}:
          </p>
          <FillBar width="w-3/4" />
        </div>

        <p className="text-2xl text-primary mt-6">
          {lang.energyText}
        </p>
      </div>
    </div>
  )
}
