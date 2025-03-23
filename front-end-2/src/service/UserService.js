import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Lấy danh sách người dùng (dành cho Admin) với phân trang và tìm kiếm
export const getAllUsers = async (page = 0, size = 4, search = "") => {
    try {
        const response = await axios.get(`${API_URL}/admin`, {
            params: { page, size, search },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        return null;
    }
};

// Thêm người dùng mới
export const addUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/admin`, user);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
        return null;
    }
};

// Cập nhật thông tin người dùng theo id
export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
        return null;
    }
};

// Lấy thông tin người dùng theo username
export const getUserInformation = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/information`, {
            params: { username },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        return null;
    }
};

// Kiểm tra tài khoản (email/username)
export const checkAccount = async (email, username) => {
    try {
        const response = await axios.get(`${API_URL}/admin/check_account`, {
            params: { email, username },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi kiểm tra tài khoản:", error);
        return null;
    }
};
