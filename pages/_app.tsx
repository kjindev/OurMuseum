import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "./components/AuthContext";
import Seo from "./components/Seo";
import Script from "next/script";

declare global {
  interface Window {
    naver: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Seo />
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
      />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
