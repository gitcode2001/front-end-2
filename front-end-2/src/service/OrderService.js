// src/service/OrderService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/orders";

export const getAllOrders = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${orderId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching order with id ${orderId}:`, error);
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(API_BASE_URL, orderData);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

export const updateOrder = async (orderId, orderData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${orderId}`, orderData);
        return response.data;
    } catch (error) {
        console.error(`Error updating order with id ${orderId}:`, error);
        throw error;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${orderId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting order with id ${orderId}:`, error);
        throw error;
    }
};
