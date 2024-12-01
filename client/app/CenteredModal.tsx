import {Fragment, ReactNode, useContext} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import { DarkContext } from './DarkModeProvider';


// A reusable component to wrap a transition and dialog overlay around a screen-centered div.
// https://github.com/GunnWATT/watt/blob/main/client/src/components/layout/CenteredModal.tsx
type CenteredModalProps = {
  isOpen: boolean, setIsOpen: (isOpen: boolean) => void,
  className: string, children: ReactNode
}
export default function CenteredModal(props: CenteredModalProps) {
  const { isOpen, setIsOpen, className, children } = props;
  const dark = useContext(DarkContext);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className="fixed z-[9998] inset-0 flex items-center justify-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 ${dark ? "bg-white/10" : "bg-black/40"}`} />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className={`${className} z-[9999] ${dark
            ? "dark bg-bg text-white border-dark-border"
            : "bg-white text-surface border-light-border"}`}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
