import Document, { Head, Html, Main, NextScript } from "next/document";

import { Favicon } from "@/common/components/FavIcon";
import GoogleAnalytic from "@/common/components/GoogleAnalytic";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Favicon />
          <GoogleAnalytic />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal"></div>
          <div id="pop-over"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
