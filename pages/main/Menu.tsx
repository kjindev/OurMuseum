import Link from "next/link";
import { useState, useRef } from "react";
import { BsChevronRight } from "react-icons/bs";

export default function Menu() {
  const [navName, setNavName] = useState("intro");
  const menuRef = useRef<HTMLDivElement>(null);
  const style = "ml-5 mb-2 cursor-pointer text-white text-sm";
  const styleHover = "ml-5 mb-2 cursor-pointer text-yellow-600 text-sm";

  return (
    <div
      ref={menuRef}
      className="menu-moving fixed z-[2] ml-[20%] w-[80%] h-[100vh] bg-black px-3 py-1 md:hidden"
    >
      <div className="pt-[7vh] flex flex-col">
        <div className="mx-5 mb-7 text-xs text-white border border-white p-5">
          <div className="flex items-center border border-black border-b-white pb-3">
            <img
              src={
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              className="w-[5vh] h-[5vh] mr-3 rounded-full"
            />

            <Link href="/LogIn">
              <div className="flex items-center text-sm">
                <div>로그인을 해주세요</div>
                <BsChevronRight className="ml-2" />
              </div>
            </Link>
          </div>
          <div className="mt-5">
            <div className="text-center">
              로그인 후 서비스를 이용해보세요 :)
            </div>
          </div>
        </div>
        <div className={navName === "intro" ? styleHover : style}>소개</div>
        <div className={navName === "now" ? styleHover : style}>현재 전시</div>
        <div className={navName === "prev" ? styleHover : style}>지난 전시</div>
        <div className={navName === "location" ? styleHover : style}>
          방문하기
        </div>
      </div>
    </div>
  );
}
