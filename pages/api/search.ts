import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface ItemType {
  DP_NAME: string;
}

const handler = async (req: any, res: NextApiResponse) => {
  if (req.method === "GET") {
    const searchList = async () => {
      const { API_KEY } = process.env;
      const API_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/ListExhibitionOfSeoulMOAInfo/10/100/`;
      let response;
      try {
        response = await axios.get(API_URL);
        const data = response?.data.ListExhibitionOfSeoulMOAInfo.row;
        if (!data) {
          return res.status(404).json({ error: "Data not found" });
        }

        const { name } = req.query;
        const items = data.filter((item: ItemType) =>
          item.DP_NAME.includes(name)
        );

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
    await searchList();
  }
};

export default handler;
