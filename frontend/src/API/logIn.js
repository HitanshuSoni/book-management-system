import axiosInstance from '../axiosInstance';

const logIn = async(formData) => {
    const response = await axiosInstance.post(
        `/api/auth/login`,
        formData
      );
      const { resp } = response.data;
    
      return resp;
}

export default logIn