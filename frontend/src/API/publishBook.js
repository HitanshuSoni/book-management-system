import axiosInstance from '../axiosInstance';

const publishBook = async ({ formData, token }) => {
  const response = await axiosInstance.post(
    `/api/books/publish`,
    formData,
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


export default publishBook