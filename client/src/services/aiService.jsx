import axios from 'axios';

const API_URL = '/api/v1/ai';

// Get auth token
const getAuthHeader = () => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const user = JSON.parse(authData);
      if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
      }
    } catch (error) {
      console.error('Error parsing auth:', error);
    }
  }
  return {};
};

// Chat with AI
export const chatWithAI = async (message, context = null) => {
  const response = await axios.post(
    `${API_URL}/chat`,
    { message, context },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Get smart product recommendations (AI detects category automatically)
export const getRecommendations = async (userMessage) => {
  const response = await axios.post(
    `${API_URL}/recommend`,
    { userMessage }
  );
  return response.data;
};