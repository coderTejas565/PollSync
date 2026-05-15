import api from "../lib/axios";

export const getAnalytics = async (pollId) => {

    const response =
      await api.get(
        `/analytics/${pollId}`
      );

    return response.data;
  };