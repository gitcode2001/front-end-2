import axios from "axios";

const API_URL = "http://localhost:8080/api/foods"; // Thay bằng API của backend
const CATEGORY_API_URL = "http://localhost:8080/api/categories"; // API danh mục

// Hàm lấy headers chứa token
const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};


export const getAllFoods = async () => {
    try {
        const response = await axios.get(`${API_URL}?include=category`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách món ăn:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Lấy món ăn theo ID
export const getFoodById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy món ăn:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Thêm món ăn mới
export const createFood = async (food) => {
    try {
        const response = await axios.post(API_URL, food, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm món ăn:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Cập nhật món ăn
export const updateFood = async (id, food) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, food, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật món ăn:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Xóa món ăn
export const deleteFood = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
        return true;
    } catch (error) {
        console.error("Lỗi khi xóa món ăn:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Lấy danh sách danh mục món ăn
export const getAllCategories = async () => {
    try {
        const response = await axios.get(CATEGORY_API_URL, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh mục món ăn:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Lấy danh mục theo ID
export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${CATEGORY_API_URL}/${id}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Thêm danh mục mới
export const createCategory = async (category) => {
    try {
        const response = await axios.post(CATEGORY_API_URL, category, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Cập nhật danh mục
export const updateCategory = async (id, category) => {
    try {
        const response = await axios.put(`${CATEGORY_API_URL}/${id}`, category, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật danh mục:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        await axios.delete(`${CATEGORY_API_URL}/${id}`, { headers: getHeaders() });
        return true;
    } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error.response?.data || error.message);
        throw error;
    }
};
