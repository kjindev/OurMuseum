import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const getList = async () => {
      const { API_KEY } = process.env;
      const API_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/ListExhibitionOfSeoulMOAInfo/10/100/`;
      let response;
      try {
        response = await axios.get(API_URL);
        const data = response?.data.ListExhibitionOfSeoulMOAInfo.row;
        if (!data) {
          return res.status(404).json({ error: "Data not found" });
        }

        const items = data;
        const perPage = 12;
        const page = Number(req.query.page) || 1;

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedItems = items.slice(startIndex, endIndex);

        const list = {
          totalPages: Math.ceil(items.length / perPage),
          currentPage: page,
          items: paginatedItems,
        };

        res.status(200).json(list);
      } catch (error) {
        console.log(error);
      }
    };
    await getList();
  }
};

export default handler;
