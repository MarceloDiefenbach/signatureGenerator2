import axios from 'axios';

const API_BASE_URL = 'http://gpt-treinador.herokuapp.com/'; // Altere para a URL correta do seu servidor

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}v1/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};