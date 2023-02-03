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
              if (window.localStorage.getItem('theme') === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.add('light');
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
