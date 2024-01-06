import axios from 'axios';
import { BASE_URL } from "./constants";

const getAllBooks = async() => {
    const response = await axios.get(
        `${BASE_URL}/api/books/published`,
      );
      const { data } = response.data.data;
    
      return data;
}

export default getAllBooks