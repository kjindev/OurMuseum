import { useRouter } from "next/router";
import { useAuth } from "../../components/AuthContext";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import useDatabase from "../../../hooks/useDatabase";
import { useState, useEffect } from "react";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

interface DataType {
  DP_MAIN_IMG: string;
  DP_ARTIST: string;
  DP_NAME: string;
  DP_PLACE: string;
  DP_SEQ: string;
  DP_END: string;
  DP_LNK: string;
  DP_INFO: string;
}

export default function NowDetail() {
  const { user } = useAuth();
  const router = useRouter();
  const {
    DP_MAIN_IMG,
    DP_ARTIST,
    DP_NAME,
    DP_PLACE,
    DP_SEQ,
    DP_END,
    DP_LNK,
    DP_INFO,
  }: any = router.query;
  const { addDatabase, deleteDatabase } = useDatabase();
  const [bookmark, setBookmark] = useState<boolean>();

  useEffect(() => {
    const getDatabase = async () => {
      if (user.email) {
        const q = query(
          collection(db, "data", user.email, "arts"),
          where("name", "==", DP_NAME)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(() => {
          setBookmark(true);
        });
      }
    };
    getDatabase();
  }, [bookmark]);

  return (
    <div className="w-[100%]">
      <div className="flex flex-col md:flex-row h-[100vh] justify-center items-center drop-shadow-lg">
        <img
          src={DP_MAIN_IMG}
          loading="lazy"
          className="w-[100%] md:w-[42%] h-[40vh] md:h-[500px] object-cover"
        />
        <div className="w-[100%] md:w-[42%] h-[500px] p-3 bg-white overflow-scroll overflow-x-hidden">
          <div className="flex items-center">
            <div className="title-font font-bold text-xl md:text-2xl mr-2">
              {DP_NAME}
            </div>
          </div>
          <div className="text-sm">
            <div className="flex justify-between items-center">
              <div>
                <div>| {DP_ARTIST}</div>
                <div>| {DP_PLACE}</div>
                <div>| {DP_END} 까지</div>
                <div>
                  |{" "}
                  <a
                    href={DP_LNK}
                    target="_blank"
                    className="italic hover:text-yellow-600"
                  >
                    홈페이지 링크
                  </a>
                </div>
              </div>
              <div>
                {user.email && (
                  <div>
                    {bookmark ? (
                      <BsFillBookmarkCheckFill
                        size={22}
                        color="#ca8a04"
                        className="hover:cursor-pointer"
                        onClick={() => {
                          deleteDatabase(DP_SEQ);
                          setBookmark(false);
                        }}
                      />
                    ) : (
                      <BsBookmarkPlus
                        size={22}
                        className="hover:cursor-pointer"
                        onClick={() => {
                          addDatabase(DP_SEQ, DP_NAME, DP_ARTIST, DP_MAIN_IMG);
                          setBookmark(true);
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="text-justify mt-3">{DP_INFO}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
