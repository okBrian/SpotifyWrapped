import Link from "next/link";
import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";

export default function UserBlock(props: {
    username: string,
    className?: string,
    userImage: string,
}) {
  const { username, className, userImage } = props;

  const lang = useContext(LangContext);

  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {userImage ? (
        <img src={userImage} className="w-16 h-16 rounded-full" />
      ) : (
        <div className="w-16 h-16 rounded-full bg-error" />
      )}
      <div className="flex flex-col">
        <p className="text-lg">
          {username}
        </p>
        <p className="text-sky-500 italic hover:cursor-pointer hover:underline">
          <Link href="/profile">
            {lang.viewProfile}
          </Link>
        </p>
      </div>
    </div>
  )
}
