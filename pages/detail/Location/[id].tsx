import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useData from "../../hooks/useData";

export default function LocationDetail() {
  const router = useRouter();
  const [list, setList] = useState<any>();
  const id: string | string[] | undefined = router.query.id;

  const { getMap } = useData();

  useEffect(() => {
    if (id) {
      getMap(id).then((res) => setList(res));
    }
  }, [id]);

  return (
    <>
      <div className="w-[100%] pt-[7vh] md:pt-0 md:h-[100vh] flex flex-col justify-center items-center">
        <div className="px-3 w-[100%] md:w-[84%] flex justify-between items-center">
          <div className="text-lg mr-2 sm:text-xl md:text-xl lg:text-3xl">
            {list?.NAME}
          </div>
        </div>
        <div className="w-[100%] mt-3 flex flex-col justify-center items-center md:flex-row drop-shadow-lg">
          <img
            src={list?.IMG}
            loading="lazy"
            className="w-[100%] md:w-[42%] h-[40vh] md:h-[500px] object-cover"
          />
          <div className="w-[100%] md:w-[42%] md:h-[500px] object-cover bg-white">
            <div>주소 | {list?.ADDRESS}</div>
            <div>전화 | {list?.PHONE}</div>
          </div>
        </div>
      </div>
    </>
  );
}
