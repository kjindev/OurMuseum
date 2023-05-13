import axios from "axios";

export default function useData() {
  const getData = async (start: string, end: string) => {
    try {
      const { data } = await axios.get(`/api/data?start=${start}&end=${end}`);
      return data.ListExhibitionOfSeoulMOAInfo.row;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getLocation = async () => {
    try {
      const { data } = await axios.get(`/api/location`);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getMap = async (id: string | string[] | undefined) => {
    try {
      const { data } = await axios.get(`/api/map?ID=${id}`);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { getData, getLocation, getMap };
}
