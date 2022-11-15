import type { JSX } from 'preact/jsx-runtime';

interface Props {
  width?: string
  color?: string
  borderWidth?: string
}

export default function Divider({ width, color, borderWidth, ...rest }: Props & JSX.IntrinsicElements['div']) {
  return (
    <div
      style={{
        width: width || '100%',
        borderBottom: `${borderWidth || '1px'} solid ${color || 'currentColor'}`
      }}
      {...rest}
    />
  );
}
