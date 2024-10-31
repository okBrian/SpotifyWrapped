export default function ArtistBlock(props: {
    num: number,
    artist: string,
    imageUrl: string,
}) {
  const { num, artist, imageUrl} = props;

  return (
    <div className="min-w-72 h-90 flex flex-col rounded-xl bg-faint-gray-light dark:bg-faint-gray-dark p-4">
      <p className="text-2xl font-bold">
        {num}
      </p>
      <p className="text-lg mb-4">
        {artist}
      </p>
      {/*<div className="w-full h-full bg-error rounded-lg" />*/}
        <img src={imageUrl} className="w-full h-full object-cover rounded-lg" />
    </div>
  )
}
