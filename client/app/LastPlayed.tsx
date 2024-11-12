export default function LastPlayed(props: {
  recentTrack: string,
  topGenre: string,
}) {
  const { recentTrack, topGenre } = props;

  return (
    <div className="flex flex-col items-end whitespace-nowrap">
      <p className="text-lg">
        Last played:
      </p>
      <p className="text-2xl text-primary mb-4">
        {recentTrack}
      </p>
      <p className="text-lg">
        Top Genre:
      </p>
      <p className="text-2xl text-primary">
        {topGenre}
      </p>
    </div>
  )
}
