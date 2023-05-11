import Head from "next/head";
import Main from "./Main";

export default function Home() {
  return (
    <div>
      <Head>
        <title>서울시립미술관 전시 안내</title>
        <meta name="description" content="서울시립미술관 전시 안내" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
      <footer className="h-[10vh] text-center">footer</footer>
    </div>
  );
}
