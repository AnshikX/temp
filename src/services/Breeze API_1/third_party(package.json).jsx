import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import {
  requestAuthInterceptorTokenAuthLogin,
  responseAuthInterceptorTokenAuthLogin,
} from "./interceptors";

export const projectAddThirdPartyDependencyCreateJSON = async (
  AddOrUpdateThirdPartyRequestBody,
  projectName,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/add-third-party-dependency/${projectName}`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...AddOrUpdateThirdPartyRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const projectAddThirdPartyDependencyCreateURLENCODED = async (
  AddOrUpdateThirdPartyRequestBody,
  projectName,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/add-third-party-dependency/${projectName}`;

  const formBody = Object.entries(AddOrUpdateThirdPartyRequestBody)
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

export const projectAddThirdPartyDependencyCreateFORMDATA = async (
  AddOrUpdateThirdPartyRequestBody,
  projectName,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/add-third-party-dependency/${projectName}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "939ac182_d7ac_4e0c_b78f_6f47e8e30b41",
    `${AddOrUpdateThirdPartyRequestBody["939ac182_d7ac_4e0c_b78f_6f47e8e30b41"]}`,
  );
  bodyFormData.append(
    "57d4ed00_88a6_4bbe_80de_99ceb17782ba",
    `${AddOrUpdateThirdPartyRequestBody["57d4ed00_88a6_4bbe_80de_99ceb17782ba"]}`,
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

export const projectDeleteThirdPartyDependencyDestroy = async (projectName) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/delete-third-party-dependency/${projectName}`;

  const api = {
    method: "delete",
    url: url,
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const projectGetThirdPartyDependencyRetrieve = async (projectName) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/get-third-party-dependency/${projectName}`;

  const api = {
    method: "get",
    url: url,
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const projectUpdateThirdPartyDependencyUpdateJSON = async (
  AddOrUpdateThirdPartyRequestBody,
  projectName,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/update-third-party-dependency/${projectName}`;

  const api = {
    method: "put",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...AddOrUpdateThirdPartyRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const projectUpdateThirdPartyDependencyUpdateURLENCODED = async (
  AddOrUpdateThirdPartyRequestBody,
  projectName,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/update-third-party-dependency/${projectName}`;

  const formBody = Object.entries(AddOrUpdateThirdPartyRequestBody)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
  const api = {
    method: "put",
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

export const projectUpdateThirdPartyDependencyUpdateFORMDATA = async (
  AddOrUpdateThirdPartyRequestBody,
  projectName,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/update-third-party-dependency/${projectName}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "939ac182_d7ac_4e0c_b78f_6f47e8e30b41",
    `${AddOrUpdateThirdPartyRequestBody["939ac182_d7ac_4e0c_b78f_6f47e8e30b41"]}`,
  );
  bodyFormData.append(
    "57d4ed00_88a6_4bbe_80de_99ceb17782ba",
    `${AddOrUpdateThirdPartyRequestBody["57d4ed00_88a6_4bbe_80de_99ceb17782ba"]}`,
  );
  const api = {
    method: "put",
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
