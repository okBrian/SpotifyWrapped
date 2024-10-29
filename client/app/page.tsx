import ArtistBlock from "./ArtistBlock";
import UserBlock from "./UserBlock";


export default function Home() {
  return (
    <div className="w-[40rem] max-w-full pt-16">
      <div className="flex mb-8">
        <div className="flex flex-col grow">
          <UserBlock username="John Doe" className="grow mb-16" />
          <div className="flex flex-wrap gap-1 text-3xl">
            <p>Your</p>
            <p className="text-secondary">
              Top 5
            </p>
            <p>Artists</p>
          </div>
        </div>

        <div className="flex flex-col items-end whitespace-nowrap">
          <p className="text-lg">
            Minutes listened:
          </p>
          <p className="text-2xl text-primary mb-4">
            100,000
          </p>
          <p className="text-lg">
            Top Genre:
          </p>
          <p className="text-2xl text-primary">
            RnB
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 overflow-x-scroll">
        {[...Array(5)].map((_, i) =>
          <ArtistBlock key={i} num={i + 1} artist="John Doe" />
        )}
      </div>
    </div>
  )
}
