export default function UserDescription(props: {
  description: string,
}) {
  const { description } = props;

  return (
    <div className="max-w-full">
      <div className="flex flex-wrap gap-2 text-3xl">
        <p>Your Music</p>
        <p className="text-secondary">
          Personality
        </p>
      </div>
      <p className="text-2xl text-primary mt-12">
        {description}
      </p>
    </div>
  )
}
