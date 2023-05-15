import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../components/AuthContext";
import useDatabase from "../../hooks/useDatabase";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import axios from "axios";

interface APIType {
  DP_NAME: string;
  DP_ARTIST: string;
  DP_SEQ: string;
  DP_MAIN_IMG: string;
  DP_PLACE: string;
  DP_START: string;
  DP_END: string;
  DP_ART_PART: string;
  DP_ART_CNT: string;
  DP_INFO: string;
  DP_LNK: string;
}

interface ListType {
  totalPages: number;
  currentPage: number;
  items: [];
}

export default function PrevDetail() {
  const { addDatabase, deleteDatabase } = useDatabase();
  const { user } = useAuth();

  const modalRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [itemList, setItemList] = useState<ListType>();
  const [pageList, setPageList] = useState<number[]>([]);
  const [searchText, setSearchText] = useState("");
  const [bookmark, setBookmark] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [modalText, setModalText] = useState({
    NAME: "",
    ARTIST: "",
    IMG: "",
    PLACE: "",
    START: "",
    END: "",
    LINK: "",
    ID: "",
    INFO: "",
  });

  const queryKey = isSearching ? ["items", page, searchText] : ["items", page];
  const fetchURL = isSearching
    ? `/api/search?page=${page}&searchText=${searchText}`
    : `/api/items?page=${page}`;

  useQuery(queryKey, () => axios.get(fetchURL), {
    onSuccess: (response) => {
      setItemList(response.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (itemList) {
      let list = [];
      for (let i = 0; i < itemList.totalPages; i++) {
        list.push(i + 1);
      }
      setPageList(list);
    }
  }, [itemList]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    if (searchText === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  };

  const handleModal = async (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const elementData = target.parentElement?.dataset;
    setBookmark(false);
    if (elementData?.name) {
      setModalText({
        NAME: elementData.name || "",
        ARTIST: elementData.artist || "",
        IMG: elementData.img || "",
        PLACE: elementData.place || "",
        START: elementData.start || "",
        END: elementData.end || "",
        LINK: elementData.link || "",
        ID: elementData.id || "",
        INFO: elementData.info?.slice(0, 400) + "...",
      });
      modalRef.current?.classList.remove("hidden");

      if (user.email) {
        const q = query(
          collection(db, "data", user.email, "arts"),
          where("name", "==", elementData?.name)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((e) => {
          if (e) {
            setBookmark(true);
          }
        });
      }
    }
  };

  const pageListClick = async (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setPage(parseInt(target.innerText));
  };

  return (
    <div className="w-[100%] flex flex-col">
      <div
        ref={modalRef}
        className="z-[2] hidden fixed bg-black w-[100%] p-5 md:px-[5%] lg:px-[15%] h-[100vh]"
      >
        <div className="flex flex-col">
          <BiX
            color="white"
            size={25}
            className="hover:cursor-pointer self-end mb-2"
            onClick={() => modalRef.current?.classList.add("hidden")}
          />
          <div className="mb-5">
            <div className="text-yellow-600 text-base lg:text-3xl">
              {modalText?.NAME}
            </div>
            <div className="z-[2] text-white text-xs lg:text-base">
              | {modalText?.ARTIST}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="z-[2] text-xs text-white">
                전시 장소 | {modalText?.PLACE}
              </div>
              <div className="z-[2] text-xs text-white ">
                전시 기간 | {modalText?.START} ~ {modalText?.END}
              </div>
            </div>
            {user.email && (
              <div>
                {bookmark ? (
                  <BsFillBookmarkCheckFill
                    size={20}
                    color="#ca8a04"
                    className="hover:cursor-pointer z-[2]"
                    onClick={() => {
                      deleteDatabase(modalText.ID);
                      setBookmark(false);
                    }}
                  />
                ) : (
                  <BsBookmarkPlus
                    size={20}
                    color="white"
                    className="hover:cursor-pointer z-[2]"
                    onClick={() => {
                      addDatabase(
                        modalText.ID,
                        modalText.NAME,
                        modalText.ARTIST,
                        modalText.IMG
                      );
                      setBookmark(true);
                    }}
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap-reverse justify-center text-xs">
            <div className="z-[2] text-white text-justify">
              {modalText?.INFO}
              <a
                href={modalText?.LINK}
                target="_blank"
                className="italic text-gray-300 hover:text-yellow-600"
              >
                더보기
              </a>
            </div>
            <Image
              src={
                modalText?.IMG ||
                "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fex%2FEXI01%2F2022%2F&FILE_NM=20221209180425_97430745879b4238b66315ab02b448dc_10e521165c8f4a3e83cc9c7e7a5987f1"
              }
              alt={modalText?.NAME || ""}
              loading="lazy"
              width={500}
              height={500}
              className="w-[100%] h-[50vh] my-3 object-cover z-[2]"
            />
          </div>
        </div>
      </div>
      <div className="md:h-[10vh] mt-10 xl:px-[20%] px-5 md:px-[10%]">
        <div className="text-3xl lg:text-4xl">| 지난 전시</div>
        <div className="flex flex-col justify-start md:flex-row md:justify-between items-start md:items-center">
          <div className="text-sm lg:text-lg">전시 제목으로 검색해보세요</div>
          <form
            onSubmit={handleSubmit}
            className="w-[98%] md:w-[30vw] lg:w-[20vw] xl:w-[15vw] flex justify-end items-center self-center drop-shadow-lg rounded-full px-2 py-1 my-3 md:my-0 bg-gray-100"
          >
            <input
              value={searchText || ""}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="제목으로 검색"
              className="w-[100%] text-sm p-1 mr-2 rounded-lg bg-gray-100"
            />
          </form>
        </div>
      </div>
      {itemList ? (
        <div
          ref={dataRef}
          className="md:mt-[3vh] xl:px-[20%] px-5 md:px-[10%] w-[100%] md:h-[70vh] flex flex-wrap content-start justify-start"
        >
          {itemList.items?.map((item: APIType) => (
            <div
              onClick={handleModal}
              key={item?.DP_SEQ}
              data-name={item?.DP_NAME}
              data-artist={item?.DP_ARTIST}
              data-id={item?.DP_SEQ}
              data-img={item?.DP_MAIN_IMG}
              data-place={item?.DP_PLACE}
              data-start={item?.DP_START}
              data-end={item?.DP_END}
              data-artpart={item?.DP_ART_PART}
              data-artcnt={item?.DP_ART_CNT}
              data-info={item?.DP_INFO}
              data-link={item?.DP_LNK}
              className="w-[50%] h-[30vh] md:w-[25%] md:h-[22vh] text-xs p-2 mb-3 flex-col hover:cursor-pointer hover:scale-105 duration-100 drop-shadow-lg"
            >
              <Image
                src={item?.DP_MAIN_IMG}
                alt={item?.DP_NAME}
                loading="lazy"
                width={250}
                height={250}
                className="w-[100%] h-[80%] object-cover"
              />
              <div className="m-2 mt-3">
                {item?.DP_NAME.length < 25
                  ? item?.DP_NAME
                  : item?.DP_NAME.slice(0, 25) + "..." || ""}
              </div>
            </div>
          ))}
          {isSearching && itemList.items.length === 0 && (
            <div className="w-[100%] text-center">검색 결과가 없습니다</div>
          )}
        </div>
      ) : (
        <div>loading...</div>
      )}
      {pageList && (
        <div className="text-xs md:text-sm py-2 px-[10%] md:h-[8vh] xl:px-[20%] flex justify-center items-center">
          {pageList.map((item, index) => (
            <div
              key={index}
              className={
                page === index + 1
                  ? "bg-yellow-500 px-2 rounded-full hover:cursor-pointer"
                  : "px-2 hover:cursor-pointer"
              }
              onClick={pageListClick}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
