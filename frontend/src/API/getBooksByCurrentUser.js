import axiosInstance from '../axiosInstance';

const getBooksByCurrentUser = async(token) => {
    const response = await axiosInstance.get(
        `/api/books/user`,
        {
            headers: {
              'x-api-key': token,
            },
            withCredentials: true,
          }
      );
      const { data } = response.data;
    
      return data;
}

export default getBooksByCurrentUser