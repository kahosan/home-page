import type { JSX } from 'preact/jsx-runtime';

interface Props {
  href?: string
  children?: preact.ComponentChildren
}

export function Link({ href, children, ...props }: Props & JSX.IntrinsicElements['a']) {
  return (
    <a {...props} href={href} className={`${props?.className || ''} link`}>{children}</a>
  );
}
