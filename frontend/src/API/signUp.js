import axiosInstance from '../axiosInstance';

const signUp = async(formData) => {
    const response = await axiosInstance.post(
        `/api/auth/signup`,
        formData
      );
      const { data } = response.data;
    
      return data;
}

export default signUp