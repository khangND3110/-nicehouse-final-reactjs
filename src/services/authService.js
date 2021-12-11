const { BASE_URL } = require("settings/constant");

const USERS_PATH = 'users';

export const register = async (data) => {
    const response = await fetch(`${BASE_URL}/${USERS_PATH}/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            content: data.content,
            fullName: data.fullName,
        })
    });
    return response;
}

export const getAvatar = async (id) => {
    const response = await fetch(`${BASE_URL}/${USERS_PATH}/avatar/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
    return response;
}

export const login = async (data) => {
    const response = await fetch(`${BASE_URL}/${USERS_PATH}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        })
    });
    return response;
}

export const me = async (token) => {
    const response = await fetch(`${BASE_URL}/${USERS_PATH}/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response;
}

export const updateProfile = async (token, data) => {
    const response = await fetch(`${BASE_URL}/${USERS_PATH}/update-profile`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            content: data.content,
        })
    });
    return response;
}

export const updateAvatar = async (token, data) => {
    const response = await fetch(`${BASE_URL}/${USERS_PATH}/update-avatar`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body: data,
    });
    return response;
}

export const updatePassword = async (token, oldPassword, newPassword) => {
    const response = await fetch(`${BASE_URL}/${USERS_PATH}/update-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            id: '0',
            oldPassword: oldPassword,
            newPassword: newPassword,
        })
    });
    return response;
}

export const getAuthor = async (id) => {
    const response = await fetch(`${BASE_URL}/${USERS_PATH}/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export const sendEmail = async (email, data) => {
    const response = await fetch(`${BASE_URL}/${USERS_PATH}/send-email`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subject: 'Nice House mail',
            email: email,
            message: data.message,
            fromEmail: data.email,
            fromPhoneNumber: data.phoneNumber,
        })
    });
    return response;
}