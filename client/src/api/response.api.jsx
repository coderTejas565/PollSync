import api from "../lib/axios";

export const submitResponse =
  async (formData) => {
    const response = await api.post(
      "/responses",
      formData
    );

    return response.data;
  };