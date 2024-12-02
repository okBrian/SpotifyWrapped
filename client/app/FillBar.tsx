export default function FillBar(props: {
  width: string,
}) {
  const { width } = props;

  return (
    <div className="h-6 w-[300px] bg-faint-gray-light dark:bg-faint-gray-dark rounded-full">
      <div className={`h-6 ${width} bg-primary rounded-full`} />
    </div>
  );
}
