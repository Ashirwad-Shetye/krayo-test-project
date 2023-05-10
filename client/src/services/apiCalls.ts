 import axios from "axios";

export const uploadFile = (params: any) => {
    return axios.post(`krayo-test-project-production.up.railway.app/api/file/upload`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getAllFile = (userId: any) => {
    return axios.get(`krayo-test-project-production.up.railway.app/file/all/${userId}`);
};

export const downloadFile = (userId: any,key: any) => {
  return axios.get(`krayo-test-project-production.up.railway.app/api/file/download/${userId}/${key}`);
};

export const deleteFile = (params: any) => {
  return axios.post(`${process.env.BASE_URL}/api/file/all`, params);
};