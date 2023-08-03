import Document, { Html, Head, Main, NextScript } from 'next/document';
import favicon from './favicon.ico'

export default function Document() {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Gunakan path yang benar menuju file favicon.ico */}
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
