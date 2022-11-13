import type { JSX } from 'preact/jsx-runtime';
import { useDark } from '@/hooks/use-dark';

interface Props {
  width?: string
  height?: string
  children: preact.ComponentChildren
}

export function Button(buttonProps: Props & JSX.IntrinsicElements['button']) {
  const { width, height, children, ...props } = buttonProps;

  const { currentTheme } = useDark();

  return (
    <button
      {...props}
      style={{
        width: width || 'inherit',
        height: height || 'inherit'
      }}
      className={(props?.className || '') + (currentTheme === 'dark' ? 'dark btn' : 'btn')}
    >
      {children}
    </button>
  );
}
