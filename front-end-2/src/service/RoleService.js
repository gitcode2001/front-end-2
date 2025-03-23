import axios from "axios";
export const API_URL = "http://localhost:8080/api";

const getAllRoles = async () => {
    try {
        const response = await axios.get(API_URL + "/roles");
        console.log("📢 API trả về danh sách roles:", response.data);

        response.data.forEach((role, index) => {
            console.log(`🔍 Role ${index}:`, role);
        });

        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi tải role:", error);
        return [];
    }
}
export {getAllRoles};