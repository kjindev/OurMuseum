import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useData from "../../hooks/useData";

interface ListType {
  name: string;
  img: string;
}

export default function Location() {
  const [list, setList] = useState<ListType[]>([]);
  const { getLocation } = useData();

  useEffect(() => {
    getLocation().then((res) => setList(res));
  }, []);

  return (
    <div className="pt-[7vh] pb-10 w-[100%] h-[100vh] flex flex-col justify-center items-center">
      <div className="text-2xl md:text-3xl">방문하기</div>
      <div className="mt-2 text-sm md:text-base">
        | 서울시립미술관을 직접 방문해보세요
      </div>
      <div className="mt-7 flex flex-wrap justify-center content-center w-[100%] md:w-[80%] xl:w-[70%]">
        {list.map((item, index) => (
          <div
            key={index}
            className="w-[45%] h-[18vh] p-2 sm:w-[30%] sm:h-[24vh] lg:w-[25%] lg:h-[25vh]"
          >
            <Link href={`detail/Location/${index}`}>
              <div className="w-[100%] h-[100%] p-1 md:p-2 bg-white drop-shadow-lg hover:scale-105 duration-100">
                <Image
                  src={item.img}
                  alt="img"
                  width={500}
                  height={500}
                  className="w-[100%] h-[85%] object-cover"
                />
                <div className="w-[100%] text-center text-xs sm:text-sm lg:text-base">
                  {item.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
