import { useContext } from "react"
import { LangContext } from "./DarkModeProvider"


export default function WrappedCover() {
  const lang = useContext(LangContext);

  return (
    <div className="max-w-full h-full flex flex-col justify-center">
      <div className="flex gap-3 flex-wrap text-5xl">
        <p>{lang.your}</p>
        <p className="text-secondary">
          Wrapped
        </p>
        <p>{lang.isHere}!</p>
      </div>
      <div className="text-primary mt-16 text-xl italic">
        {lang.cover}
      </div>
    </div>
  )
}
