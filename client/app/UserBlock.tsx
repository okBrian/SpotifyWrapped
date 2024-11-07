export default function UserBlock(props: {
    username: string,
    className?: string,
    userImage: string,
}) {
  const { username, className, userImage } = props;

  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {userImage ? (
        <img src={userImage} className="w-16 h-16 rounded-full" />
      ) : (
        <div className="w-16 h-16 rounded-full bg-error" />
      )}
      <p className="text-lg">
        {username}
      </p>
    </div>
  )
}
