export default function Diversity(props: {
  diversity: number,
}) {
  const { diversity } = props;

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>How</p>
        <p className="text-secondary">
          Diverse
        </p>
        <p>Is Your Music?</p>
      </div>
      <p className="text-5xl font-bold text-primary mt-8">
        {(diversity * 3).toFixed(1)}%
      </p>
      <p className="text-2xl text-primary mt-12">
        You have a {diversity === null ? "unknown" : diversity < 5 ? "monolithic" : diversity < 10 ? "consistent" : diversity < 20 ? "balanced" : diversity < 30 ? "diverse" : "universal"} music taste.
      </p>
    </div>
  )
}
