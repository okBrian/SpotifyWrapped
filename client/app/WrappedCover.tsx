export default function WrappedCover() {
  return (
    <div className="max-w-full h-full flex flex-col justify-center">
      <div className="flex gap-3 flex-wrap text-5xl">
        <p>Your</p>
        <p className="text-secondary">
          Wrapped
        </p>
        <p>is Here!</p>
      </div>
      <div className="text-primary mt-16 text-xl italic">
        Use the arrows below to find out what your music is like!
      </div>
    </div>
  )
}
