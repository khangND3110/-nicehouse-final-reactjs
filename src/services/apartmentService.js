const { BASE_URL } = require("settings/constant");

const APARTMENTS_PATH = 'apartments';

export const createApartment = async (token, data) => {
    const response = await fetch(`${BASE_URL}/${APARTMENTS_PATH}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data,
    });
    return response;
}

export const getApartments = async (token) => {
    const response = await fetch(`${BASE_URL}/${APARTMENTS_PATH}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export const getApartmentsOwner = async (token) => {
    const response = await fetch(`${BASE_URL}/${APARTMENTS_PATH}/owner`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response;
}

export const getApartmentDetail = async (id) => {
    const response = await fetch(`${BASE_URL}/${APARTMENTS_PATH}/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response;
}