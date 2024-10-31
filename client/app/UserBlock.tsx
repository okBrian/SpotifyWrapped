export default function UserBlock(props: {
  username: String,
  className?: String,
}) {
  const { username, className } = props;

  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      <div className="w-16 h-16 rounded-full bg-error" />
      <p className="text-lg">
        {username}
      </p>
    </div>
  )
}
