import { Language } from "@/util/types";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Switch } from "@nextui-org/react";
import { LuSun, LuMoon } from "react-icons/lu";
import { GrGlobe } from "react-icons/gr";
import { LANGUAGES } from "@/util/languages";
import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";
import Link from "next/link";
import { MdHome } from "react-icons/md";


export default function Header(props: {
  dark: boolean,
  setDark: (value: boolean) => void,
  language: Language,
  setLanguage: (value: Language) => void,
}) {
  const { dark, setDark, language, setLanguage } = props;

  const lang = useContext(LangContext);

  return (
    <div className="w-full h-16 px-4 flex justify-center items-center border-b-2 border-light-border dark:border-dark-border">
      <div className="whitespace-nowrap grow">
        <p className="hidden md:block text-3xl hover:underline hover:cursor-pointer">
          <Link href="/">
            Spotify Wrapped
          </Link>
        </p>
        <div className="block md:hidden hover:cursor-pointer w-min">
          <Link href="/">
            <MdHome size="30" />
          </Link>
        </div>
      </div>
      <div className="flex justify-end dark:text-white">
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="bordered" 
              className="border-2 border-light-border dark:border-dark-border rounded-lg mr-6"
              startContent={
                <GrGlobe />
              }
            >
              {language}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            onAction={key => setLanguage(key as Language)}
            className={`${dark ? "bg-bg text-white" : "bg-white text-surface"} drop-shadow-lg rounded-lg border-2 border-light-border dark:border-dark-border`}
          >
            {Object.keys(LANGUAGES).map(l =>
              <DropdownItem key={l}>
                {l}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>

        <Switch
          isSelected={dark}
          onValueChange={setDark}
          size="lg"
          color="primary"
          thumbIcon={dark ? (
            <LuMoon size="20" />
          ) : (
            <LuSun size="20" />
          )}
          classNames={{
            wrapper: `border-2 transition duration-300 border-light-border dark:border-dark-border ${dark ? "" : "bg-slate-300"}`,
          }}
        >
          {lang.darkMode}
        </Switch>
      </div>
    </div>
  )
}
