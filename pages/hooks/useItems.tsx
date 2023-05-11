export default function useItems() {
  const getItems = async (page: number) => {
    try {
      const response = await fetch(`/api/items?page=${page}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const searchItems = async (page: number, name: string) => {
    try {
      const response = await fetch(`/api/search?page=${page}&name=${name}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { getItems, searchItems };
}
