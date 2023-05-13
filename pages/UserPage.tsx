import { useState, useEffect, useRef } from "react";
import { useAuth } from "./components/AuthContext";
import { User, getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { BsDashCircle } from "react-icons/bs";
import useDatabase from "./hooks/useDatabase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import Image from "next/image";

interface ListType {
  img: string;
  id: string;
  name: string;
  artist: string;
}

export default function UserPage() {
  const { user, dispatch } = useAuth();
  const { deleteDatabase } = useDatabase();

  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [artList, setArtList] = useState<ListType[]>([]);

  const [nameEditing, setNameEditing] = useState(false);
  const [userNameChanged, setUserNameChanged] = useState("");

  useEffect(() => {
    let arts: ListType[] = [];
    if (user?.email) {
      const artQuery = query(collection(db, "data", user.email, "arts"));
      onSnapshot(artQuery, (querySnapshot) => {
        arts = [];
        querySnapshot.forEach((doc) => {
          arts.push(doc.data() as ListType);
        });
        console.log(arts);
        setArtList(arts);
      });
    }
  }, [user]);

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setUserNameChanged(target.value);
  };

  const updateUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNameEditing(false);
    const auth = getAuth();
    updateProfile(auth.currentUser as User, {
      displayName: userNameChanged,
    }).then(() =>
      dispatch({
        type: "Update",
        payload: {
          email: user.email,
          name: userNameChanged,
          photo: user.photo,
        },
      })
    );
  };

  const updatePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let image = null;
    if (fileInputRef.current?.files?.length) {
      image = fileInputRef.current.files[0];
      const auth = getAuth();
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${image.name}`);
      const metadata = {
        contentType: "image/jpeg",
      };
      await uploadBytes(storageRef, image, metadata);
      await getDownloadURL(storageRef).then((url) => {
        updateProfile(auth.currentUser as User, {
          photoURL: url,
        }).then(() =>
          dispatch({
            type: "Update",
            payload: {
              email: user.email,
              name: user.name,
              photo: url,
            },
          })
        );
      });
    }
  };

  if (!user.email) {
    return (
      <div className="w-[100%] h-[100vh] flex justify-center items-center">
        <div className="text-center">
          이 페이지는 로그인 후 사용할 수 있습니다.
        </div>
      </div>
    );
  } else {
    return (
      <div className="pb-5 md:p-0">
        <div className="w-[100%] pt-[12vh] md:h-[100vh] flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-center items-center w-[100%] md:w-[80%] md:h-[70vh]">
            <div className="w-[100%] md:w-[25%] h-[100%] flex flex-col justify-center sm:justify-start items-center">
              <img
                src={user?.photo}
                loading="lazy"
                className="w-[10vh] h-[10vh] sm:w-[12vh] sm:h-[12vh] md:w-[20vh] md:h-[20vh] object-cover rounded-[50%]"
              />
              {!nameEditing && (
                <div className="sm:text-base md:text-xl mt-3 md:mt-5">
                  {user.name}
                </div>
              )}
              {nameEditing && (
                <form
                  onSubmit={updateUsername}
                  className="mt-3 md:mt-5 md:ml-5 flex justify-center items-center"
                >
                  <input
                    onChange={changeUsername}
                    type="text"
                    value={userNameChanged || ""}
                    placeholder={user.email}
                    className="w-[100%] md:w-[70%] text-center border border-white border-b-gray-500"
                  />
                  <input
                    type="submit"
                    value="확인"
                    className="hover:cursor-pointer text-sm"
                  />
                </form>
              )}
              <div className="text-sm md:text-base text-gray-500">
                {user?.email}
              </div>
              <div
                className="my-3 md:mt-5 w-[100%] flex flex-col items-center justify-center rounded-lg"
                onMouseOver={() =>
                  tooltipRef.current?.classList.remove("hidden")
                }
                onMouseOut={() => tooltipRef.current?.classList.add("hidden")}
              >
                <div className="hover:cursor-pointer text-yellow-600 w-[100%] text-sm text-center">
                  프로필 수정
                </div>
                <div
                  ref={tooltipRef}
                  className="z-[2] text-center w-[70%] hidden"
                >
                  <div
                    onClick={() => setNameEditing(true)}
                    className="mt-2 hover:cursor-pointer hover:text-yellow-600 text-sm"
                  >
                    이름 변경
                  </div>
                  <form className="mt-1">
                    <label
                      htmlFor="input-file"
                      className="hover:cursor-pointer hover:text-yellow-600 text-sm"
                    >
                      사진 변경
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={updatePhoto}
                      id="input-file"
                      className="hidden"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="md:pl-10 w-[100%] md:w-[80%] md:h-[100%]">
              <div className="p-0 md:pl-10 flex flex-wrap content-start w-[100%] md:h-[100%] md:overflow-x-hidden">
                {artList.length === 0 ? (
                  <div></div>
                ) : (
                  artList.map((item: any) => (
                    <div
                      data-id={item.id}
                      key={item.id}
                      className="flex m-2 p-2 w-[100%] h-[20vh] md:h-[30%] bg-white rounded-lg drop-shadow-lg"
                    >
                      <Image
                        src={item.img}
                        alt="img"
                        width={300}
                        height={300}
                        className="w-[30%] h-[100%] object-cover rounded-lg"
                      />
                      <div className="w-[70%] p-2 overflow-hidden">
                        <div className="text-sm md:text-base font-bold">
                          {item.name}
                        </div>
                        <div className="text-sm">{item.artist}</div>
                      </div>
                      <BsDashCircle
                        className="hover:cursor-pointer"
                        size={15}
                        onClick={() => deleteDatabase(item.id)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
