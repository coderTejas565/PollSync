import api from "../lib/axios";

export const getMyPolls = async () => {
    const response = await api.get("/polls/me")

    return response.data;
}

export const getPublicPoll =
  async (slug) => {
    const response = await api.get(
      `/polls/${slug}`
    );

    return response.data;
  };

export const createPoll =
  async (formData) => {
        const response = await api.post( "/polls",formData)

        return response.data
}

export const getPublicResults = async (slug) => {
    const response = await api.get(`/polls/${slug}/results`)

    return response.data;
}

export const publishPoll = async (pollId) => {
    const response = await api.patch(
      `/polls/${pollId}/publish`
    );

    return response.data;
  };