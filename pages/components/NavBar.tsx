import Link from "next/link";
import Menu from "../main/Menu";
import { BsList } from "react-icons/bs";
import { useAuth } from "./AuthContext";
interface Props {
  handleScrollView: (event: React.MouseEvent<HTMLElement>) => void;
  navName: string;
}

export default function NavBar({ handleScrollView, navName }: Props) {
  const { user, logout } = useAuth();
  const style = "ml-5 py-1 cursor-pointer text-sm maxmd:hidden";
  const styleObserve =
    "ml-5 py-1 cursor-pointer text-yellow-600 text-sm maxmd:hidden";

  return (
    <>
      <Menu />
      <div className="fixed z-[2] w-[100%] flex justify-between items-center px-5 py-2 bg-white drop-shadow">
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
          {!user ? (
            <Link href={"/LogIn"}>
              <span className="hover:cursor-pointer text-sm ml-5">로그인</span>
            </Link>
          ) : (
            <span
              onClick={logout}
              className="hover:cursor-pointer text-sm ml-5"
            >
              로그아웃
            </span>
          )}
        </div>
        <div onClick={handleScrollView} className="md:hidden">
          <BsList />
        </div>
      </div>
    </>
  );
}
