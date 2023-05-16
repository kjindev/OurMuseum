import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface Data {
  name: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "GET") {
    const getAPI = async (request: NextApiRequest) => {
      const { start, end } = req.query;
      const { NEXT_PUBLIC_API_KEY } = process.env;
      const API_URL = `http://openapi.seoul.go.kr:8088/${NEXT_PUBLIC_API_KEY}/json/ListExhibitionOfSeoulMOAInfo/${start}/${end}/`;
      let response;
      try {
        response = await axios.get(API_URL);
      } catch (error) {
        console.log(error);
      }
      console.log(req);
      return response;
    };
    await getAPI(req).then((response) => {
      res.json(response?.data);
    });
  }
};

export default handler;
