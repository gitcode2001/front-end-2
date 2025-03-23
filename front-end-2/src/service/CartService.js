import axios from "axios";

const API_URL = "http://localhost:8080/api/carts";

// Lấy tất cả giỏ hàng
export const getAllCarts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error getting all carts:", error);
        throw error;
    }
};

// Lấy giỏ hàng theo id
export const getCartById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting cart by id:", error);
        throw error;
    }
};

// Tạo giỏ hàng mới
export const createCart = async (cart) => {
    try {
        const response = await axios.post(API_URL, cart);
        return response.data;
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
};

// Cập nhật giỏ hàng theo id
export const updateCart = async (id, cart) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, cart);
        return response.data;
    } catch (error) {
        console.error("Error updating cart:", error);
        throw error;
    }
};

// Xóa giỏ hàng theo id
export const deleteCart = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting cart:", error);
        throw error;
    }
};

// Thanh toán giỏ hàng theo userId
export const checkoutCart = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/checkout/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error checking out cart:", error);
        throw error;
    }
};

// Lấy giỏ hàng theo userId
export const getCartsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting carts by user id:", error);
        throw error;
    }
};
