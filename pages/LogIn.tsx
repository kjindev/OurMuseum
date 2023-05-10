export default function LogIn() {
  return (
    <div className="bg-black w-[100%]">
      <div className="p-5 fixed"></div>
      <div className="h-[100vh] flex flex-col justify-center items-center pb-12">
        <div className="h-[10%] text-xl text-white">로그인</div>
        <div className="flex flex-col justify-center items-center bg-white p-9 rounded-2xl w-[320px]">
          <form className="flex flex-col items-center text-sm w-[100%]">
            <input
              name="email"
              type="text"
              placeholder="이메일"
              required
              //ref={emailRef}
              className="p-2 px-3 my-2 border w-[100%] border-white border-b-gray-500"
            />
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              //ref={passwordRef}
              className="p-2 px-3 my-2 border w-[100%] border-white border-b-gray-500
          "
            />
            <input
              type="submit"
              value="로그인"
              className="bg-yellow-500 w-[100%] rounded-full p-2 hover:cursor-pointer text-sm m-2 mt-5"
            />
          </form>
          <button
            name="google"
            className="bg-gray-200 w-[100%] rounded-full p-2 hover:cursor-pointer text-sm flex items-center justify-center"
          >
            구글 계정으로 로그인
          </button>
          <span className="text-xs underline underline-offset-2 m-2 mt-5 hover:cursor-pointer">
            아직 회원이 아니신가요?
          </span>
        </div>
      </div>
    </div>
  );
}
