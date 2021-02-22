import axios from "axios";

import { baseUrl } from "./endpoints";

const getStarships = ({ filter, page}) => new Promise((resolve, reject) => {
    return axios.get(`${baseUrl}?search=${filter}&page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            const result = response?.data
            resolve({
                meta: {
                    status: "success",
                    error: '',
                },
                data: result || [],
            })
        })
        .catch(error => {
            const errorData = error?.response?.data ?? {}
            reject(errorData)
        })
});

const getStarshipDetail = (id) => new Promise((resolve, reject) => {
    return axios.get(`${baseUrl}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            const result = response?.data
            resolve({
                meta: {
                    status: "success",
                    error: '',
                },
                data: result || [],
            })
        })
        .catch(error => {
            const errorData = error?.response?.data ?? {}
            reject(errorData)
        })
});

export default {
    getStarshipDetail,
    getStarships
}