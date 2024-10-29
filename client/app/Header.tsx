import { Switch } from "@nextui-org/react";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";


export default function Header(props: {
  dark: boolean,
  setDark: (value: boolean) => void,
}) {
  const { dark, setDark } = props;

  return (
    <div className="w-full h-16 flex justify-center items-center border-b-2">
      <div className="w-full" />
      <p className="text-3xl whitespace-nowrap">
        Spotify Wrapped
      </p>
      <div className="w-full flex justify-end pr-6">
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
            wrapper: `border-2 transition duration-300 ${dark ? "border-white" : "bg-slate-300 border-black"}`,
          }}
        >
          Dark mode
        </Switch>
      </div>
    </div>
  )
}
