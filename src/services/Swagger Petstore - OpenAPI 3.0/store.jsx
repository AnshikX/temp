import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import {
  requestAuthInterceptorApiKeyLogin,
  responseAuthInterceptorApiKeyLogin,
} from "./interceptors";

export const getInventory = async () => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_SWAGGER_PETSTORE___OPENAPI_3_0}store/inventory`;

  const api = {
    method: "get",
    url: url,
  };

  localInstance.interceptors.request.use(requestAuthInterceptorApiKeyLogin);
  localInstance.interceptors.response.use(responseAuthInterceptorApiKeyLogin);

  let resp = await localInstance.request(api);

  return resp.data;
};

export const placeOrderJSON = async (Order) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_SWAGGER_PETSTORE___OPENAPI_3_0}store/order`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...Order },
  };

  let resp = await localInstance.request(api);

  return resp.data;
};

export const placeOrderXML = async () => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_SWAGGER_PETSTORE___OPENAPI_3_0}store/order`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/xml" },
  };

  let resp = await localInstance.request(api);

  return resp.data;
};

export const placeOrderURLENCODED = async (Order) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_SWAGGER_PETSTORE___OPENAPI_3_0}store/order`;

  const formBody = Object.entries(Order)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
  const api = {
    method: "post",
    url: url,
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    data: formBody,
  };

  let resp = await localInstance.request(api);

  return resp.data;
};

export const getOrderById = async (orderId) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_SWAGGER_PETSTORE___OPENAPI_3_0}store/order/${orderId}`;

  const api = {
    method: "get",
    url: url,
  };

  let resp = await localInstance.request(api);

  return resp.data;
};

export const deleteOrder = async (orderId) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_SWAGGER_PETSTORE___OPENAPI_3_0}store/order/${orderId}`;

  const api = {
    method: "delete",
    url: url,
  };

  let resp = await localInstance.request(api);

  return resp.data;
};
