import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html>
      <Head />
      <body className="transition-color duration-300">
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              if (!window.localStorage) return;

              const theme = window.localStorage.getItem('theme')
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
              if (theme !== 'dark' && theme !== 'light') {
                document.documentElement.classList.add(systemTheme);
              } else if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              };
            })()
          `
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps
  };
};

export default MyDocument;
