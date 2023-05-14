import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useAuth } from "./components/AuthContext";

export default function LogIn() {
  const router = useRouter();
  const { user } = useAuth();
  const [newAccount, setNewAccount] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let email = emailRef.current?.value;
      let password = passwordRef.current?.value;
      if (email && password) {
        const auth = getAuth();
        if (newAccount) {
          createUserWithEmailAndPassword(auth, email, password);
        } else {
          signInWithEmailAndPassword(auth, email, password);
        }
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const auth = getAuth();
            if (user.photoURL === null) {
              updateProfile(auth.currentUser as User, {
                photoURL:
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              });
            }
            if (user.displayName === null) {
              updateProfile(auth.currentUser as User, {
                displayName: user.email,
              });
            }
            router.push("/");
          }
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleGoogleLogIn = async () => {
    let provider;
    try {
      provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (user.email) {
    router.push("/");
    return (
      <div className="w-[100%] h-[100vh] flex justify-center items-center">
        404 Error !
      </div>
    );
  } else {
    return (
      <div className="bg-black w-[100%]">
        <div className="p-5 fixed"></div>
        <div className="h-[100vh] flex flex-col justify-center items-center pb-12">
          <div className="h-[10%] text-xl text-white">
            {newAccount ? "회원가입" : "로그인"}
          </div>
          <div className="flex flex-col justify-center items-center bg-white p-9 rounded-2xl w-[320px]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center text-sm w-[100%]"
            >
              <input
                name="email"
                type="text"
                placeholder="이메일"
                required
                ref={emailRef}
                className="p-2 px-3 my-2 border w-[100%] border-white border-b-gray-500"
              />
              <input
                name="password"
                type="password"
                placeholder="비밀번호"
                required
                ref={passwordRef}
                className="p-2 px-3 my-2 border w-[100%] border-white border-b-gray-500
            "
              />
              <input
                type="submit"
                value={newAccount ? "회원가입" : "로그인"}
                className="bg-yellow-500 w-[100%] rounded-full p-2 hover:cursor-pointer text-sm m-2 mt-5"
              />
            </form>
            <button
              onClick={handleGoogleLogIn}
              className="bg-gray-200 w-[100%] rounded-full p-2 hover:cursor-pointer text-sm flex items-center justify-center"
            >
              {newAccount ? "구글 계정으로 회원가입" : "구글 계정으로 로그인"}
            </button>
            <span
              onClick={() => setNewAccount((prev) => !prev)}
              className="text-xs underline underline-offset-2 m-2 mt-5 hover:cursor-pointer"
            >
              {newAccount
                ? "이미 계정이 있으신가요?"
                : "아직 회원이 아니신가요?"}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
