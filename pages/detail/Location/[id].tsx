import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import useData from "../../hooks/useData";
import Image from "next/image";

export default function LocationDetail() {
  const router = useRouter();
  const mapRef = useRef<HTMLInputElement>(null);
  const [list, setList] = useState<any>();
  const id: any = router.query.id;

  const { getMap } = useData();

  useEffect(() => {
    if (id) {
      getMap(id).then((res) => setList(res));
    }
  }, [id]);

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver && list) {
      const location = new naver.maps.LatLng(list.LAT, list.LNG);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      });
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, [list]);

  return (
    <>
      <div className="w-[100%] md:h-[100vh] flex flex-col justify-center items-center">
        <div className="text-lg sm:text-xl md:text-xl lg:text-3xl">
          {list?.NAME}
        </div>
        <div className="w-[100%] mt-3 flex flex-col justify-center items-center md:flex-row drop-shadow-lg">
          {list?.IMG ? (
            <Image
              src={list.IMG}
              alt="img"
              width={700}
              height={700}
              className="w-[100%] md:w-[42%] h-[40vh] md:h-[500px] object-cover"
            />
          ) : (
            <div>Loading...</div>
          )}
          <div className="p-3 w-[100%] md:w-[42%] md:h-[500px] object-cover bg-white">
            <div>입장시간 | {list?.TIME}</div>
            <div>관람료 | {list?.ADMISSION}</div>
            <div>전화 | {list?.PHONE}</div>
            <div>주소 | {list?.ADDRESS}</div>
            <div
              ref={mapRef}
              className="mt-5 w-[100%] h-[30vh] md:h-[350px]"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
