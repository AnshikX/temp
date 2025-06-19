import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import {
  requestAuthInterceptorTokenAuthLogin,
  responseAuthInterceptorTokenAuthLogin,
} from "./interceptors";

export const codeGenCodeIndexingCreate = async (projectId) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/code-gen/${projectId}/code-indexing`;

  const api = {
    method: "post",
    url: url,
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const codeGenGenerateReactApiClientCreateJSON = async (
  GenerateServiceFileRequestBody,
  projectId,
  type,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/code-gen/${projectId}/generate-react-api-client/${type}`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...GenerateServiceFileRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const codeGenGenerateReactApiClientCreateURLENCODED = async (
  GenerateServiceFileRequestBody,
  projectId,
  type,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/code-gen/${projectId}/generate-react-api-client/${type}`;

  const formBody = Object.entries(GenerateServiceFileRequestBody)
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

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const codeGenGenerateReactApiClientCreateFORMDATA = async (
  GenerateServiceFileRequestBody,
  projectId,
  type,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/code-gen/${projectId}/generate-react-api-client/${type}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "e3936120_ce25_49d2_9e0e_4582bff9f42c",
    `${GenerateServiceFileRequestBody["e3936120_ce25_49d2_9e0e_4582bff9f42c"]}`,
  );
  bodyFormData.append(
    "f8403b52_e447_43f6_a3a3_06eeab4dd69b",
    `${GenerateServiceFileRequestBody["f8403b52_e447_43f6_a3a3_06eeab4dd69b"]}`,
  );
  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "multipart/form-data" },
    data: bodyFormData,
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};
