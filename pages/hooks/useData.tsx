export default function useData() {
  const getData = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/data?start=${start}&end=${end}`);
      const result = await response.json();
      return result.ListExhibitionOfSeoulMOAInfo.row;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getLocation = async () => {
    try {
      const response = await fetch(`/api/location`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getMap = async (id: string | string[] | undefined) => {
    try {
      const response = await fetch(`/api/map?ID=${id}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { getData, getLocation, getMap };
}
