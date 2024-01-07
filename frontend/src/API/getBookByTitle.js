import axiosInstance from '../axiosInstance';

const getBookByTitle = async(searchQuery) => {
    const response = await axiosInstance.get(
        `/api/books/search?title=${searchQuery}`,
      );
      const { data } = response.data;
    
      return data;
}

export default getBookByTitle