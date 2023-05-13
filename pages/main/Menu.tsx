import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { useAuth } from "../components/AuthContext";
interface Props {
  handleScrollView: (event: React.MouseEvent<HTMLElement>) => void;
  navName: string;
}
export default function Menu({ handleScrollView, navName }: Props) {
  const { user, logout } = useAuth();
  const style = "ml-5 mb-2 cursor-pointer text-white text-sm";
  const styleHover = "ml-5 mb-2 cursor-pointer text-yellow-600 text-sm";

  return (
    <div onClick={handleScrollView} className="pt-[7vh] flex flex-col">
      <div className="mx-5 mb-7 text-xs text-white border border-white p-5">
        <div className="flex items-center border border-black border-b-white pb-3">
          <img
            src={
              user
                ? user.photo
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            className="w-[5vh] h-[5vh] mr-3 rounded-full"
          />
          {user ? (
            <div className="text-white sm:text-sm">
              {user.name === null ? (
                <div>{`${user.email} 님`}</div>
              ) : (
                <div>{`${user.name} 님`}</div>
              )}
            </div>
          ) : (
            <Link href="/LogIn">
              <div className="flex items-center text-sm">
                <div>로그인을 해주세요</div>
                <BsChevronRight className="ml-2" />
              </div>
            </Link>
          )}
        </div>
        <div className="mt-5">
          {user ? (
            <div className="flex maxxs:flex-col justify-center items-center">
              <Link href="/UserPage">
                <div className="mx-5">마이페이지</div>
              </Link>
              <div onClick={logout} className="mx-5 hover:cursor-pointer">
                로그아웃
              </div>
            </div>
          ) : (
            <div className="text-center">
              로그인 후 서비스를 이용해보세요 :)
            </div>
          )}
        </div>
      </div>
      <div className={navName === "intro" ? styleHover : style}>소개</div>
      <div className={navName === "now" ? styleHover : style}>현재 전시</div>
      <div className={navName === "prev" ? styleHover : style}>지난 전시</div>
      <div className={navName === "location" ? styleHover : style}>
        방문하기
      </div>
    </div>
  );
}
