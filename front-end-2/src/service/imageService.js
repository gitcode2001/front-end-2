import axios from "axios";

const API_URL = "http://localhost:8080/api/images";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getImages = async () => {
    try {
        const { data } = await axiosInstance.get("/");
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách ảnh:", error);
        return [];
    }
};

export const getImageById = async (id) => {
    try {
        const { data } = await axiosInstance.get(`/${id}`);
        return data;
    } catch (error) {
        console.error(`Lỗi khi lấy ảnh ID ${id}:`, error);
        return null;
    }
};

export const createImage = async (image) => {
    try {
        const { data } = await axiosInstance.post("/", image);
        return data;
    } catch (error) {
        console.error("Lỗi khi tạo ảnh:", error);
        return null;
    }
};

export const updateImage = async (id, image) => {
    try {
        const { data } = await axiosInstance.put(`/${id}`, image);
        return data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật ảnh ID ${id}:`, error);
        return null;
    }
};

export const deleteImage = async (id) => {
    try {
        await axiosInstance.delete(`/${id}`);
        return true;
    } catch (error) {
        console.error(`Lỗi khi xóa ảnh ID ${id}:`, error);
        return false;
    }
};
