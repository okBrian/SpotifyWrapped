"use client"
import { createContext, ReactNode, useState } from "react";
import Header from "./Header";
import { Language } from "@/util/types";
import { lang } from "@/util/languages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const LangContext = createContext(lang("English"));

export default function DarkModeProvider(props: {
  children: ReactNode,
}) {
  const { children } = props;

  const [dark, setDark] = useState(true);
  const [language, setLanguage] = useState<Language>("English");

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className={"w-full h-full flex flex-col items-center transition" + (dark
        ? " dark bg-bg text-white border-dark-border"
        : " bg-white text-surface border-light-border")}>
      <LangContext.Provider value={lang(language)}>
      <ToastContainer 
        theme={dark ? "dark" : "light"}
        closeOnClick
        pauseOnHover={false}
      />
        <Header 
          dark={dark} setDark={setDark} 
          language={language} setLanguage={setLanguage} 
          loggedIn={loggedIn} setLoggedIn={setLoggedIn} 
          loading={loading} setLoading={setLoading}
        />
        <div className="w-[80rem] max-w-full h-full p-4 pt-16">
          {children}
        </div>
      </LangContext.Provider>
    </div>
  )
}
