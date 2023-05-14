import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import AuthContextProvider from "./components/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Seo from "./components/Seo";

declare global {
  interface Window {
    naver: any;
  }
}
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Seo />
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
      />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
