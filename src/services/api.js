import axios from 'axios';

const baseURL = "https://localhost:7039/api/vehicles";

export const getVehicles = () => {  
    return axios.get(`${baseURL}`);
};

export const getVehicle = (id) => {  
    return axios.get(`${baseURL}/${id}`);
}

export const addVehicle = (vehicle) => {
    return axios.post(`${baseURL}`, vehicle);
};

export const updateVehicle = (id, vehicle) => {
    return axios.put(`${baseURL}/${id}`, vehicle);
};

export const deleteVehicle = (id) => {
    return axios.delete(`${baseURL}/${id}`);
};