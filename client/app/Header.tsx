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
          color="primary"
          thumbIcon={dark ? (
            <LuMoon />
          ) : (
            <LuSun />
          )}
          classNames={{
            wrapper: "border-2"
          }}
        >
          Dark mode
        </Switch>
      </div>
    </div>
  )
}
