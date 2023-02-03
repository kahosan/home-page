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
              const theme = window.localStorage.getItem('theme')
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
              if (!window.localStorage) return;
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else if (theme === 'light') {
                document.documentElement.classList.add('light');
              } else {
                document.documentElement.classList.add(systemTheme);
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
