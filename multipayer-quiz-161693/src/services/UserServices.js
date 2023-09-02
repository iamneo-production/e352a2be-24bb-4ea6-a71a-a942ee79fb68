import http from '../util/http';
import axios from 'axios';

export const getAllUsers = async () => {
    try {
        const response = await http.get("/users");
        return response.data;
    } catch (error) {
        console.error('Error getting users:', error);
        return [];
    }
};

export const getuser = async (id) => {
    try {
        const response = await http.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

export const findUserByEmail = async (email, password) => {
    try {
        const response = await axios.get('http://localhost:8080/users', {
            params: {
                email: email,
                password: password
            },
        });

        if (response.data.length > 0) {
            return response.data[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return null;
    }
};

export const createUser = async (data) => {
    try {
        const response = await http.post("/users", data);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

export const updateUser = async (id, data) => {
    try {
        const response = await http.put(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
};
