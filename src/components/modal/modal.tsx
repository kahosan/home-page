import { createPortal } from 'preact/compat';
import type { JSXInternal } from 'preact/src/jsx';
import Button from '../button';

interface ModalProps {
  open: boolean
  title: string
  subTitle?: string
  children?: preact.ComponentChildren
}

interface ModalActionProps {
  onClick?: () => void
  children?: preact.ComponentChildren
}

export function ModalAction({ onClick, children, ...props }: ModalActionProps & JSXInternal.IntrinsicElements['button']) {
  return (
    <>
      <Button {...props} width="100%" height="40px" className="border-none! rounded-2 " onClick={onClick}>
        {children}
      </Button>
      <div className="bg-#fff border-r op-20" />
    </>
  );
}

export default function Modal({ open, title, subTitle, children }: ModalProps) {
  return (
    open
      ? createPortal(
        <div className="absolute top-0 right-0 left-0 bottom-0 z-1000 bg-black:70">
          <div className="h-60% flex justify-center items-center">
            <div className="border dark:border-#fff:20 border-#000:30 rounded-2 w-100 mx-2 dark:bg-#000 light:bg-#fff">
              <header className="text-center mb-5 mt-5">
                <h3>{title}</h3>
                <p className="op-60 mt-1 text-0.875rem">{subTitle}</p>
              </header>
              <section className="min-h-10">
                {children}
              </section>
            </div>
          </div>
        </div>,
        document.body
      )
      : null
  );
}
