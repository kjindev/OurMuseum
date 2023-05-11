import { useRouter } from "next/router";

interface DataType {
  DP_MAIN_IMG: string;
  DP_ARTIST: string;
  DP_NAME: string;
  DP_PLACE: string;
  DP_INFO: string;
  DP_END: string;
  DP_LNK: string;
}

export default function NowDetail() {
  const router = useRouter();
  const query: any = router.query;

  return (
    <>
      <div className="w-[100%]">
        <div className="flex flex-col md:pt-0 md:flex-row h-[100vh] justify-center items-center drop-shadow-lg">
          <img
            src={query.DP_MAIN_IMG}
            loading="lazy"
            className="w-[100%] md:w-[42%] h-[40vh] md:h-[500px] object-cover"
          />
          <div className="w-[100%] md:w-[42%] h-[500px] p-3 bg-white overflow-scroll overflow-x-hidden">
            <div className="flex items-center">
              <div className="title-font font-bold text-xl md:text-2xl mr-2">
                {query.DP_NAME}
              </div>
            </div>
            <div className="text-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div>| {query.DP_ARTIST}</div>
                  <div>| {query.DP_PLACE}</div>
                  <div>| {query.DP_END} 까지</div>
                  <div>
                    |{" "}
                    <a
                      href={query.DP_LNK}
                      target="_blank"
                      className="italic hover:text-yellow-600"
                    >
                      홈페이지 링크
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-justify mt-3">{query.DP_INFO}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
