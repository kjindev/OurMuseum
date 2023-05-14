import Link from "next/link";
import Menu from "../main/Menu";
import { useState, useRef } from "react";
import { BsList, BsX } from "react-icons/bs";
import { useAuth } from "./AuthContext";
interface Props {
  handleScrollView: (event: React.MouseEvent<HTMLElement>) => void;
  navName: string;
}

export default function NavBar({ handleScrollView, navName }: Props) {
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const style = "ml-5 py-1 cursor-pointer text-sm maxmd:hidden";
  const styleObserve =
    "ml-5 py-1 cursor-pointer text-yellow-600 text-sm maxmd:hidden";
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = () => {
    setMenuVisible(true);
    menuRef.current?.classList.remove("hidden");
    menuRef.current?.classList.add("flex");
  };

  const hideMenu = () => {
    setMenuVisible(false);
    menuRef.current?.classList.add("hidden");
    menuRef.current?.classList.remove("flex");
  };

  return (
    <div className="z-20 w-[100vw] fixed">
      {menuVisible && (
        <div className="md:hidden z-50 absolute right-0 p-2">
          <BsX
            onClick={hideMenu}
            size={30}
            color="white"
            className="hover:cursor-pointer mr-3"
          />
        </div>
      )}
      <div ref={menuRef} className="hidden fixed z-30 w-[100%] h-[100vh]">
        <div onClick={hideMenu} className="w-[20%]"></div>
        <div className="menu-moving w-[80%] h-[100%]  bg-black   px-3 py-1">
          <Menu handleScrollView={handleScrollView} navName={navName} />
        </div>
      </div>
      <div className="w-[100%] flex fixed justify-between items-center px-4 py-2 drop-shadow  bg-white">
        <div>OurMuseum</div>
        <div onClick={handleScrollView} className="maxmd:hidden">
          <span className={navName === "intro" ? styleObserve : style}>
            소개
          </span>
          <span className={navName === "now" ? styleObserve : style}>
            현재 전시
          </span>
          <span className={navName === "prev" ? styleObserve : style}>
            지난 전시
          </span>
          <span className={navName === "location" ? styleObserve : style}>
            방문하기
          </span>
          {!user.email ? (
            <Link href={"/LogIn"}>
              <span className="hover:cursor-pointer text-sm ml-5">로그인</span>
            </Link>
          ) : (
            <>
              <Link href={"/UserPage"}>
                <span className="hover:cursor-pointer text-sm ml-5">
                  마이페이지
                </span>
              </Link>
              <span
                onClick={logout}
                className="hover:cursor-pointer text-sm ml-5"
              >
                로그아웃
              </span>
            </>
          )}
        </div>
        <BsList
          onClick={showMenu}
          size={25}
          className="hover:cursor-pointer md:hidden"
        />
      </div>
    </div>
  );
}
