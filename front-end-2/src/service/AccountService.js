import axios from "axios";

const API_URL = "http://localhost:8080/api/login";

// Đăng nhập: gửi POST đến /api/login
export const login = async (username, password) => {
    try {
        const response = await axios.post(
            `${API_URL}`,
            { username, password },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || "Đăng nhập thất bại" };
    }
};

// Đổi mật khẩu: gửi PUT đến /api/login/change-password
export const changePassword = async (oldPassword, newPassword) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            `${API_URL}/change-password`,
            { oldPassword, newPassword },
            { headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đổi mật khẩu:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || "Đổi mật khẩu thất bại" };
    }
};

// Quên mật khẩu: gửi POST đến /api/login/forgot-password
export const forgotPassword = async (emailOrUsername) => {
    try {
        const response = await axios.post(
            `${API_URL}/forgot-password`,
            { emailOrUsername },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gửi yêu cầu quên mật khẩu:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || "Lấy lại mật khẩu thất bại" };
    }
};

// Xác thực OTP: gửi POST đến /api/login/verify-otp
export const verifyOtp = async (emailOrUsername, otp) => {
    try {
        const response = await axios.post(
            `${API_URL}/verify-otp`,
            { emailOrUsername, otp },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xác thực OTP:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || "Xác thực OTP thất bại" };
    }
};

// Đặt lại mật khẩu: gửi PUT đến /api/login/reset-password
export const resetPassword = async (emailOrUsername, newPassword) => {
    try {
        const response = await axios.put(
            `${API_URL}/reset-password`,
            { emailOrUsername, newPassword },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đặt lại mật khẩu:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || "Đặt lại mật khẩu thất bại" };
    }
};

// Khóa tài khoản: gửi PUT đến /api/login/lock/{id}
export const lockAccount = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            `${API_URL}/lock/${id}`,
            {},
            { headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi khóa tài khoản:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || "Khóa tài khoản thất bại" };
    }
};
