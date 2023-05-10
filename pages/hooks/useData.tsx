export default function useData() {
  const getData = async (type: string, start: string, end: string) => {
    try {
      if (type === "data") {
        const response = await fetch(`/api/data?start=${start}&end=${end}`);
        const result = await response.json();
        return result.ListExhibitionOfSeoulMOAInfo.row;
      } else if (type === "location") {
        const response = await fetch(`/api/location`);
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { getData };
}
