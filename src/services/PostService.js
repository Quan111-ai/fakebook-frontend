import api from "../api";

export const likePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addComment = async (postId, comment) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, { comment });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
