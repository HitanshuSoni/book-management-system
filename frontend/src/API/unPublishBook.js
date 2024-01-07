import axiosInstance from '../axiosInstance';

const unPublishBook = async ( bookId, token ) => {
  const response = await axiosInstance.put(
    `/api/books/unpublish/${bookId}`,
    {},
    {
      headers: {
        'x-api-key': token,
        'Content-Type': 'application/json',
      },
    }
  );

  const { data } = response.data;
  return data;
};


export default unPublishBook