import { useContext } from "react";
import { LangContext } from "./DarkModeProvider";


export default function Footer(props: {
    topArtists: string[][],
  }) {
    const { topArtists } = props;
    var stringBuilder = "My Spotify Wrapped %0A"
    for(var i = 0; i < topArtists.length; i++) {
        stringBuilder += (i + 1).toString() + ". " + topArtists[i][0] + "%0A"
    }

    return (
        <div className="flex row space-x-4">
            <a href={"https://x.com/intent/post?text=" + stringBuilder}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href={"https://www.linkedin.com/feed/?shareActive=true&text=" + stringBuilder}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
        </div>
    )
}
