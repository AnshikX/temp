import { axiosInstance, duplicateInstance } from "../interceptors";

export const requestAuthInterceptorTokenAuthLogin = (request) => {
  const token = "";
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

export const responseAuthInterceptorTokenAuthLogin = async (response) => {
  try {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw response;
  } catch (error) {
    const originalRequest = error.config;

    if (error.response) {
      const { status } = error.response;

      if (status >= 400 && status < 500) {
        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
        } else {
          return Promise.reject(error.response);
        }
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
};

export const moduleInstance = duplicateInstance(axiosInstance);
moduleInstance.defaults.baseURL = import.meta.env.VITE_BREEZE_API;
