const { BASE_URL } = require("settings/constant");

const REVIEWS_PATH = 'reviews';

export const createReview = async (token, data) => {
    const response = await fetch(`${BASE_URL}/${REVIEWS_PATH}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data,
    });
    return response;
}

export const getReviews = async (token, apartmentId) => {
    const response = await fetch(`${BASE_URL}/${REVIEWS_PATH}/${apartmentId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response;
}