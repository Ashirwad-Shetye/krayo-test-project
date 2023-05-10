 import axios from "axios";

export const uploadFile = (params: any) => {
    return axios.post(`http://localhost:5000/api/file/upload`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getAllFile = (params: any) => {
  return axios.post(`${process.env.BASE_URL}/api/file/all`, params);
};

export const downloadFile = (params: any) => {
  return axios.post(`${process.env.BASE_URL}/api/file/get`, params);
};

export const deleteFile = (params: any) => {
  return axios.post(`${process.env.BASE_URL}/api/file/all`, params);
};