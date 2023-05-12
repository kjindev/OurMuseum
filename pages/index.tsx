import Head from "next/head";
import Main from "./Main";

export default function Home() {
  return (
    <div>
      <Main />
      <footer className="h-[10vh] text-center">footer</footer>
    </div>
  );
}
