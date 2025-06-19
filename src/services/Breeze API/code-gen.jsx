import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import {
  requestAuthInterceptorTokenAuthLogin,
  responseAuthInterceptorTokenAuthLogin,
} from "./interceptors";

export const codeGenCodeIndexingCreate = async (projectId) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/code-gen/${projectId}/code-indexing`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/code-gen/${projectId}/generate-react-api-client/${type}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/code-gen/${projectId}/generate-react-api-client/${type}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/code-gen/${projectId}/generate-react-api-client/${type}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "1b495f57_130a_422d_9b65_25311bd251a4",
    `${GenerateServiceFileRequestBody["1b495f57_130a_422d_9b65_25311bd251a4"]}`,
  );
  bodyFormData.append(
    "1b39d7b3_2b50_469b_9f9b_8fe56a6ec404",
    `${GenerateServiceFileRequestBody["1b39d7b3_2b50_469b_9f9b_8fe56a6ec404"]}`,
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
