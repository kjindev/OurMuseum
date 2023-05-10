import Link from "next/link";

export default function NavBar({ handleScrollView }: any) {
  return (
    <div className="fixed z-[1] w-[100%] flex justify-between items-center px-5 py-3 bg-white">
      <div>OurMuseum</div>
      <div onClick={handleScrollView}>
        <span className="mr-3 hover:cursor-pointer text-sm">소개</span>
        <span className="mr-3 hover:cursor-pointer text-sm">현재 전시</span>
        <span className="mr-3 hover:cursor-pointer text-sm">지난 전시</span>
        <span className="mr-3 hover:cursor-pointer text-sm">방문하기</span>
        <Link href={"/LogIn"}>
          <span className="hover:cursor-pointer text-sm">로그인</span>
        </Link>
      </div>
    </div>
  );
}
