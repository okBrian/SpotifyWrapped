import FillBar from "./FillBar";


export default function Danceability() {
  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>How</p>
        <p className="text-secondary">
          Danceable
        </p>
        <p>is Your Music?</p>
      </div>
      <div className="flex flex-col gap-4 mt-12">
        <div className="flex gap-6 items-center">
          <p className="text-2xl text-primary w-48">
            Danceability:
          </p>
          <FillBar width="w-[200px]" />
        </div>
        
        <div className="flex gap-6 items-center">
          <p className="text-2xl text-primary w-48">
            Energy:
          </p>
          <FillBar width="w-[250px]" />
        </div>

        <p className="text-2xl text-primary mt-6">
          Your music is very energetic and danceable.
        </p>
      </div>
    </div>
  )
}
