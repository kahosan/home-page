interface Props {
  href?: string
  children?: React.ReactNode
}

export default function Link({ href, children, ...props }: Props & JSX.IntrinsicElements['a']) {
  return (
    <a {...props} href={href} className={`${props?.className || ''} link`}>{children}</a>
  );
}
