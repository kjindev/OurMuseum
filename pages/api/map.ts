import type { NextApiRequest, NextApiResponse } from "next";

interface ListType {
  ID: string;
  NAME: string;
  IMG: string;
  ADDRESS: string;
  PHONE: string;
  LAT: number;
  LNG: number;
}

const list = [
  {
    ID: "0",
    NAME: "서울시립미술관 서소문본관",
    IMG: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220318141012_ed572a7d566c4aceb8998064d46a204a_4ca445f99fb7420994c0bebafe2de5da",
    ADDRESS: "서울시 중구 덕수궁길 61(서소문동)",
    PHONE: "02-2124-8800",
    LAT: 37.5640625,
    LNG: 126.9738125,
  },
  {
    ID: "1",
    NAME: "서울시립 북서울미술관",
    IMG: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220513095232_c0ebb8e285034548af730cffb2bdd055_b4f14662ffb84f0da2f672fc2053852d",
    ADDRESS: "서울시 노원구 동일로 1238(중계동)",
    PHONE: "02-2124-8800",
    LAT: 37.6407938,
    LNG: 127.0667628,
  },
  {
    ID: "2",
    NAME: "서울시립 남서울미술관",
    IMG: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220318141104_0cec42e25349445b9e597098ca952391_17219a61af5948dcbbdb382af726a363",
    ADDRESS: "서울시 관악구 남부순환로 2076(남현동)",
    PHONE: "02-2124-8800",
    LAT: 37.4761313,
    LNG: 126.9795938,
  },
  {
    ID: "3",
    NAME: "서울시립 미술아카이브",
    IMG: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220107193547_a78150f14adc45e59931073ab6cf1115_bd44dfffbdf7489e86516580e822982b",
    ADDRESS: "서울시 종로구 평창문화로 101(평창동)",
    PHONE: "02-2133-4191",
    LAT: 37.6103289,
    LNG: 126.9744456,
  },
  {
    ID: "4",
    NAME: "서울시립 난지미술창작스튜디오",
    IMG: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119170041_f2515359263f46f1b1f7e9581be90baa_324511ebbfe249c8a30361a024ab33a1",
    ADDRESS: "서울 마포구 하늘공원로 108-1(상암동)",
    PHONE: "02-2124-8800",
    LAT: 37.5690289,
    LNG: 126.8785234,
  },
  {
    ID: "5",
    NAME: "SeMA 벙커",
    IMG: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119161909_eac3c04784d249a2bd2cdc14aa2b6f64_f5eebbf92d60485ab307008aba5a1ba5",
    ADDRESS: "서울 영등포구 여의대로 지하 76(여의도동)",
    PHONE: "02-2124-8942",
    LAT: 37.5254177,
    LNG: 126.9242075,
  },
  {
    ID: "6",
    NAME: "SeMA 창고",
    IMG: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119170004_e0060b4359424cf4b16665a26262236b_38dd7561a710400d92d8ce97d7c7efa6",
    ADDRESS: "서울 은평구 통일로 684(서울혁신파크 5동)",
    PHONE: "02-2124-8946",
    LAT: 37.6092596,
    LNG: 126.9342695,
  },
  {
    ID: "7",
    NAME: "SeMA 백남준기념관",
    IMG: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119162110_0db45f47f85e476e9f36e2d720bd7bbd_0ee2d7a1a5314f31b335802e9796f6fd",
    ADDRESS: "서울 종로구 종로53길 12-1(창신동)",
    PHONE: "02-2124-5268",
    LAT: 37.5730106,
    LNG: 127.0137485,
  },
];

const handler = (req: any, res: NextApiResponse<any>) => {
  if (req.method === "GET") {
    const { ID } = req.query;
    const map = list.find((item) => item.ID === ID);
    if (!map) {
      return res.status(404).send("Not Found");
    }
    res.json(map);
  }
};

export default handler;
