import { Language } from "@/util/types";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Switch } from "@nextui-org/react";
import { LuSun, LuMoon } from "react-icons/lu";
import { GrGlobe } from "react-icons/gr";
import { LANGUAGES } from "@/util/languages";
import { useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { LangContext } from "./DarkModeProvider";


export default function Header(props: {
  dark: boolean,
  setDark: (value: boolean) => void,
  language: Language,
  setLanguage: (value: Language) => void,
  loggedIn: boolean,
  setLoggedIn: (value: boolean) => void,
  loading: boolean,
  setLoading: (value: boolean) => void,
}) {
  const { dark, setDark, language, setLanguage, loggedIn, setLoggedIn, loading, setLoading } = props;

  const lang = useContext(LangContext);
  const router = useRouter();

  useEffect(() => {
    const ls = localStorage.getItem('loggedIn');

    if (ls && JSON.parse(ls)) {
      setLoggedIn(true);
    }
  }, []);

  const logOut = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/logout/", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    setLoading(false);
    if (res.status === 200) {
      localStorage.setItem("loggedIn", JSON.stringify(false));
      setLoggedIn(false);
      router.push("/");
      toast.success("Logged Out!");
    }
  }

  return (
    <div className="w-full h-16 flex justify-center items-center border-b-2 border-light-border dark:border-dark-border">
      <div className="w-full" />
      <p className="text-3xl whitespace-nowrap">
        Spotify Wrapped
      </p>
      <div className="w-full flex justify-end pr-6 dark:text-white">
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

        <Button
          color="warning"
          size="lg"
          isLoading={loading}
          onClick={() => { logOut() }}
        >
          <p className="font-bold">
            Log out
          </p>
        </Button>
      </div>
    </div>
  )
}
