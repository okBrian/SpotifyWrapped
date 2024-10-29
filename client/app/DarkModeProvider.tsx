"use client"
import { ReactNode, useState } from "react";
import Header from "./Header";


export default function DarkModeProvider(props: {
  children: ReactNode,
}) {
  const { children } = props;

  const [dark, setDark] = useState(true);

  return (
    <div className={"w-full h-full flex flex-col items-center transition" + (dark
        ? " dark bg-bg text-white border-dark-border"
        : " bg-white text-surface border-light-border")}>
      <Header dark={dark} setDark={setDark} />
      {children}
    </div>
  )
}
