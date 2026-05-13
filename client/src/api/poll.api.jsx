import api from "../lib/axios";

export const getMyPolls = async () => {
    const response = await api.get("/poll/me")

    return response.data;
}