import { Button } from "@nextui-org/react";
import { ReactNode, useState } from "react"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";


export default function Carousel(props: {
  slides: ReactNode[],
}) {
  const { slides } = props;

  const [index, setIndex] = useState(0);

  return (
    <div className="flex gap-4 justify-center items-center max-w-full h-96">
      <Button
        variant="bordered"
        disabled={index === 0}
        onPress={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
        className={`h-full rounded-xl transition ${index === 0 ? "text-black/50 dark:text-white/50"
          : "bg-faint-gray-light dark:bg-faint-gray-dark"}`}
      >
        <MdOutlineKeyboardArrowLeft size="70" />
      </Button>

      <div className="grow min-w-0">
        {slides[index]}
      </div>

      <Button
        variant="bordered"
        disabled={index === slides.length - 1}
        onPress={() => {
          if (index < slides.length - 1) {
            setIndex(index + 1);
          }
        }}
        className={`h-full rounded-xl transition ${index === slides.length - 1 ? "text-black/50 dark:text-white/50"
          : "bg-faint-gray-light dark:bg-faint-gray-dark"}`}
      >
        <MdOutlineKeyboardArrowRight size="70" />
      </Button>
    </div>
  )
}
