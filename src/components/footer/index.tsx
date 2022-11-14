import { Link } from '../link';

export default function Footer() {
  return (
    <footer className=" max-w-5xl mx-auto p-3 op-60">
      <div className="font-300 text-13px flex justify-between items-end w-full">
        <p>
          <Link href="https://blog.kahosan.top">Blog</Link>
          <Link href="https://twitter.com/kaho_suyf">Twitter</Link>
        </p>
        <div className="text-right">
          <p className="mr-4px mb-1">由<Link href="https://github.com/kahosan/home-page">Home-Page</Link>强力驱动</p>
          <span className="op-100">©&nbsp;{new Date().getFullYear()} </span>
          PowerBy&nbsp;
          <Link href="https://cn.vitejs.dev/">Vite</Link> & <Link href="https://preactjs.com/">Preact</Link>
        </div>
      </div>
    </footer>
  );
}
