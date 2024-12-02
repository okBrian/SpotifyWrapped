import FillBar from "./FillBar";


export default function Acousticness() {
  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p className="text-secondary">
          Acoustic
        </p>
        <p>or</p>
        <div className="flex">
          <p className="text-secondary">
            Electronic
          </p>
          <p>?</p>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-12">
        <div className="flex gap-6 items-center">
          <p className="text-2xl text-primary w-48">
            Acousticness:
          </p>
          <FillBar width="w-[50px]" />
        </div>

        <p className="text-2xl text-primary">
          Your music uses mostly electronic instruments.
        </p>
      </div>
    </div>
  )
}
