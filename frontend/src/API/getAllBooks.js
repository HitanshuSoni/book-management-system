import axiosInstance from '../axiosInstance';

const getAllBooks = async() => {
    const response = await axiosInstance.get(
        `/api/books/published`,
      );
      const { data } = response.data;
    
      return data;
}

export default getAllBooks