import { useEffect, useState } from "react";
import useData from "../hooks/useData";
import Link from "next/link";
import Image from "next/image";

export default function Prev() {
  const [data, setData] = useState<any[]>([]);
  const { getData } = useData();

  useEffect(() => {
    getData("10", "19").then((res) => setData([...res, ...res]));
  }, []);

  return (
    <div className="pt-[7vh] h-[100vh] flex flex-col justify-center items-center">
      <div className="text-2xl md:text-3xl">지난 전시</div>
      <div className="mt-2 mb-5 text-sm md:text-base">
        | 서울시립미술관의 지난 전시를 확인해보세요
      </div>
      <div className="h-[50%] drop-shadow-md">
        {data && (
          <div className="flex w-[1500%] md:w-[400%] h-[100%] image-box">
            {data.map((item, index) => (
              <div key={index} className="w-[100%] md:w-[50%]">
                <Image
                  src={item.DP_MAIN_IMG}
                  alt="img"
                  width={500}
                  height={500}
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Link href="/detail/Prev">
        <div className="text-sm mt-5 p-3 px-5 border border-black hover:bg-yellow-600 hover:border-yellow-600 hover:text-white">
          자세히 알아보기
        </div>
      </Link>
    </div>
  );
}
