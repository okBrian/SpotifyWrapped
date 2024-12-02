import { Button } from "@nextui-org/react";
import { ReactNode, useState } from "react"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";


export default function Carousel(props: {
  slides: ReactNode[],
}) {
  const { slides } = props;

  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 justify-center items-center max-w-full h-[35rem]">
      <div className="grow min-w-0 w-full max-w-full flex justify-center">
        {slides[index]}
      </div>

      <div className="flex">
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

        <div className="flex items-center gap-1 md:gap-3 px-6">
          {[...Array(slides.length)].map((_, i) =>
            <div key={i} className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition
              ${i === index ? "bg-bg dark:bg-white" : "bg-bg/30 dark:bg-white/30"}`} />
          )}
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
    </div>
  )
}
