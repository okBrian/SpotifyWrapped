export default function ArtistBlock(props: {
  num: number,
  artist: String,
}) {
  const { num, artist } = props;

  return (
    <div className="min-w-72 h-72 flex flex-col rounded-xl bg-faint-gray-light dark:bg-faint-gray-dark p-4">
      <p className="text-2xl font-bold">
        {num}
      </p>
      <p className="text-lg mb-4">
        {artist}
      </p>
      <div className="w-full h-full bg-error rounded-lg" />
    </div>
  )
}
