export default function LastPlayed(props: {
  recentTrack: string,
}) {
  const { recentTrack } = props;

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>Your</p>
        <p className="text-secondary">
          Last Played
        </p>
        <p>Song</p>
      </div>
      <p className="text-2xl text-primary mt-12">
        {recentTrack || "Song"}
      </p>
    </div>
  )
}
