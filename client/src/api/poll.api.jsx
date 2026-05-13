import api from "../lib/axios";

export const getMyPolls = async () => {
    const response = await api.get("/poll/me")

    return response.data;
}

export const createPoll = async (formData) => {
    const response = await api.post("/polls",formData)

    return response.data
}