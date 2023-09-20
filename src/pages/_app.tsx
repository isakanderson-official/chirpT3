import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>{`Isak's T3 App`}</title>
        <meta name="description" content="😉" />
        <meta property="og:image" content="/icon.png" />
        <meta
          property="og:description"
          content="Are you ready to take your emoji game to the next level? Look no further! Our Next.js Stack test application is the perfect playground for emoji enthusiasts and developers alike."
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
