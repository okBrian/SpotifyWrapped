import { UserDescriptionType } from "@/util/types";
import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";


export default function UserDescription(props: {
  description: UserDescriptionType,
}) {
  const { description } = props;
  const lang = useContext(LangContext);

  const getDescription = () => {
    switch (lang.lang) {
      case "English":
        return description.english;
      case "Chinese":
        return description.chinese;
      case "Korean":
        return description.korean;
    }
  }

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>Your Music</p>
        <p className="text-secondary">
          Personality
        </p>
      </div>
      <p className="text-2xl text-primary mt-12">
        {getDescription()}
      </p>
    </div>
  )
}
