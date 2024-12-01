"use client"
import { createContext, ReactNode, useState } from "react";
import Header from "./Header";
import { Language } from "@/util/types";
import { lang } from "@/util/languages";


export const LangContext = createContext(lang("English"));
export const DarkContext = createContext(true);

export default function DarkModeProvider(props: {
  children: ReactNode,
}) {
  const { children } = props;

  const [dark, setDark] = useState(true);
  const [language, setLanguage] = useState<Language>("English");

  return (
    <div className={"w-full h-full flex flex-col items-center transition" + (dark
        ? " dark bg-bg text-white border-dark-border"
        : " bg-white text-surface border-light-border")}>
      <LangContext.Provider value={lang(language)}>
        <DarkContext.Provider value={dark}>
          <Header dark={dark} setDark={setDark} language={language} setLanguage={setLanguage} />
          <div className="w-[80rem] max-w-full h-full p-4 pt-16">
            {children}
          </div>
        </DarkContext.Provider>
      </LangContext.Provider>
    </div>
  )
}
