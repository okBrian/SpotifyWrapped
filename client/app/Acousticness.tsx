import { useContext } from "react";
import FillBar from "./FillBar";
import { LangContext } from "./DarkModeProvider";


export default function Acousticness() {
  const lang = useContext(LangContext);
  
  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p className="text-secondary">
          {lang.acoustic}
        </p>
        <p>{lang.or}</p>
        <div className="flex">
          <p className="text-secondary">
            {lang.electronic}
          </p>
          <p>?</p>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-12">
        <div className="flex gap-6 items-center">
          <p className="text-2xl text-primary w-48">
            {lang.acousticness}:
          </p>
          <FillBar width="w-1/4" />
        </div>

        <p className="text-2xl text-primary">
          {lang.acousticText}
        </p>
      </div>
    </div>
  )
}
