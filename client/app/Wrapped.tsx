import { WrappedInfo } from "@/util/types";
import Carousel from "./Carousel";
import Top5Artists from "./Top5Artists";
import Top5Albums from "./Top5Albums";
import LastPlayed from "./LastPlayed";
import TopGenre from "./TopGenre";
import UserDescription from "./UserDescription";
import Acousticness from "./Acousticness";
import Diversity from "./Diversity";
import Danceability from "./Danceability";
import WrappedCover from "./WrappedCover";


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
      <WrappedCover />,
      <Top5Artists topArtists={topArtists} />,
      <Top5Albums topAlbums={topAlbums} />,
      <LastPlayed recentTrack={recentTrack ?? ""} />,
      <TopGenre topGenres={topGenres ?? ""} />,
      <Diversity diversity={genreDiversity} />,
      <UserDescription description={userDescription ?? ""} />,
      <Acousticness />,
      <Danceability />,
    ]} />
  )
}
