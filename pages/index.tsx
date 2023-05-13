import Main from "./Main";
import { AiFillGithub } from "react-icons/ai";

export default function Home() {
  return (
    <div>
      <Main />
      <footer className="text-center w-[100%] flex justify-center items-center">
        <div className="w-[50%] border border-white border-t-black p-3 pb-7 mx-10 text-xs flex justify-center items-center">
          <AiFillGithub size={22} className="m-1 mr-2 md:m-3" />
          <a
            className="hover:cursor-pointer hover:text-gray-500"
            href="https://github.com/kjindev"
            target="_blank"
          >
            github.com/kjindev
          </a>
        </div>
      </footer>
    </div>
  );
}
