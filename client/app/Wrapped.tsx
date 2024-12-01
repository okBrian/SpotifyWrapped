import { WrappedInfo } from "@/util/types";
import Carousel from "./Carousel";
import Top5Artists from "./Top5Artists";
import Top5Albums from "./Top5Albums";
import LastPlayed from "./LastPlayed";
import TopGenre from "./TopGenre";
import UserDescription from "./UserDescription";


export default function Wrapped(props: {
  wrapped: WrappedInfo,
}) {
  const { wrapped } = props;
  const { 
    genreDiversity,
    topArtists,
    topAlbums,
    topGenres,
    recentTrack,
    userDescription,
  } = wrapped;

  return (
    <Carousel slides={[
      <Top5Artists topArtists={topArtists} />,
      <Top5Albums topAlbums={topAlbums} />,
      <LastPlayed recentTrack={recentTrack ?? ""} />,
      <TopGenre topGenres={topGenres ?? ""} genreDiversity={genreDiversity ?? 50} />,
      <UserDescription description={userDescription ?? ""} />,
    ]} />
  )
}
