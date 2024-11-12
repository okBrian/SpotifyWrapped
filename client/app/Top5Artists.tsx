import ArtistBlock from "./ArtistBlock";


export default function Top5Artists(props: {
  topArtists: string[][],
}) {
  const { topArtists } = props;

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-1 text-3xl">
        <p>Your</p>
        <p className="text-secondary">
          Top 5
        </p>
        <p>Artists</p>
      </div>
      
      <div className="flex gap-4 overflow-x-scroll px-3 py-6">
        {[...Array(5)].map((_, i) =>
          <ArtistBlock key={i} num={i + 1} artist={topArtists[i][0] || ""} imageUrl={topArtists[i][1] || ""}/>
        )}
      </div>
    </div>
  )
}
