import type { JSXInternal } from 'preact/src/jsx';

interface Props {
  icon?: string
  text?: string
  placeholder?: string
  style?: JSXInternal.CSSProperties
}

export default function InputGroup({ icon, text, placeholder, style, ...props }: Props & JSXInternal.IntrinsicElements['input']) {
  return (
    <div className="flex items-stretch flex-wrap relative w-full text-3.5 h-[calc(2.25*16px)]" style={style}>
      <span className={`${icon} flex items-center input-group-border-left text-inherit py-1.5 px-3 text-center`}>
        {text}
      </span>
      <input placeholder={placeholder} className="flex flex-auto input-group-border-right outline-none bg-inherit p-1" {...props} />
    </div>
  );
}
