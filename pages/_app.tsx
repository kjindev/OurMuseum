import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "./components/AuthContext";
import Seo from "./components/Seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Seo />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
