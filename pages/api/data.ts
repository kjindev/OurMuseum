import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface Data {
  name: string;
}

const handler = async (req: any, res: NextApiResponse<Data>) => {
  if (req.method === "GET") {
    const { start, end } = req.query;
    const getAPI = async (request: Request) => {
      const { API_KEY } = process.env;
      const API_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/ListExhibitionOfSeoulMOAInfo/${start}/${end}/`;
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
  } else if (req.method === "POST") {
    console.log("post");
  }
};

export default handler;
