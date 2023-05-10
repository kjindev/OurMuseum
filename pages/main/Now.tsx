import Link from "next/link";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight, BsGeoAlt } from "react-icons/bs";
import useData from "../hooks/useData";

export default function Now() {
  const [data, setData] = useState<any[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [prevButtomVisible, setPrevButtonVisible] = useState(true);
  const [nextButtomVisible, setNextButtonVisible] = useState(true);
  const { getData } = useData();

  useEffect(() => {
    getData("data", "1", "5").then((res) => setData(res));
  }, []);

  return (
    <div className="pt-[10vh] pb-10 flex flex-col justify-center items-center w-[100%] md:h-[100vh]">
      {data.length === 0 ? (
        <div className="flex items-center justify-center w-[70%] h-[30vh] md:w-[80%] md:h-[30vh] lg:w-[840px] lg:h-[60vh] xl:w-[1020px]">
          <div>Loading...</div>
        </div>
      ) : (
        <div>
          <div className="text-center text-2xl md:text-3xl">현재 전시</div>
          <div className="mt-0 md:mt-2 text-center text-sm md:text-base">
            | 클릭하여 자세한 내용을 확인해보세요
          </div>
          <div style={{ width: `${500}%` }} className="mt-1 lg:mt-7 flex">
            {data?.map((item, index) => (
              <div
                key={index}
                className="w-[100%] flex flex-col lg:flex-row items-center justify-center drop-shadow-lg"
                style={
                  {
                    //transform: `translateX(-${slideIndex * 100}%)`,
                    //transitionDuration: "1.1s",
                  }
                }
              >
                <img
                  src={item.DP_MAIN_IMG}
                  className="w-[80vw] h-[30vh] lg:w-[420px] lg:h-[60vh] xl:w-[510px] object-cover"
                />
                <div className="w-[80vw] lg:w-[420px] lg:h-[60vh] xl:w-[510px] p-3 bg-white">
                  <div>
                    <div className="title-font font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl">
                      {item.DP_NAME}
                    </div>
                    <div className="mt-1 md:mt-2 flex items-center text-sm md:text-base text-justify">
                      <div>{item.DP_PLACE}</div>
                    </div>
                    <div className="md:hidden mt-2 md:mt-5 text-xs text-justify sm:text-sm">
                      {`${item.DP_INFO.substr(0, 350)} ...`}
                    </div>
                    <div className="mt-2 maxmd:hidden md:mt-5 text-xs text-justify sm:text-sm">
                      {`${item.DP_INFO.substr(0, 420)} ...`}
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-2 py-2 w-[100%] text-center text-xs sm:text-sm hover:cursor-pointer hover:text-yellow-600">
                    <Link href={`/detail/Now/${index}`}>자세히 알아보기</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="pt-5 flex justify-between md:justify-center items-center z-[1] text-xs md:text-sm">
        <BsChevronLeft
          size={18}
          className={
            prevButtomVisible ? "hover:cursor-pointer ml-10" : "invisible ml-10"
          }
        />
        {data && (
          <div className="px-[10vw]">{`${slideIndex + 1} / ${
            data.length
          }`}</div>
        )}
        <BsChevronRight
          size={18}
          className={
            nextButtomVisible ? "hover:cursor-pointer mr-10" : "invisible mr-10"
          }
        />
      </div>
    </div>
  );
}
