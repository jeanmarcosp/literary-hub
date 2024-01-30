import axios from 'axios';

export const markPoemAsRead = async (userId, poemId) => {
  try {
    await axios.put(`${ROOT_URL}/mark-poem-as-read/${userId}/${poemId}`);
  } catch (error) {
    console.error('Error marking poem as read:', error);
  }
};

export const handleLike = async (userId, poemId) => {
  try {
    await axios.put(`${ROOT_URL}/poems/${poemId}/${userId}/like`);
  } catch (error) {
    console.error('Error liking poem:', error);
  }
};

export const handleDislike = async (userId, poemId) => {
  try {
    await axios.put(`${ROOT_URL}/poems/${poemId}/${userId}/unlike`);
  } catch (error) {
    console.error('Error unliking poem:', error);
  }
};