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
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/add-third-party-dependency/${projectName}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/add-third-party-dependency/${projectName}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/add-third-party-dependency/${projectName}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "814ab8a6_c7a2_4c25_81d2_52809ad71665",
    `${AddOrUpdateThirdPartyRequestBody["814ab8a6_c7a2_4c25_81d2_52809ad71665"]}`,
  );
  bodyFormData.append(
    "da1e203b_10f8_415b_9ad0_23b5fe072bc7",
    `${AddOrUpdateThirdPartyRequestBody["da1e203b_10f8_415b_9ad0_23b5fe072bc7"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/delete-third-party-dependency/${projectName}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/get-third-party-dependency/${projectName}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/update-third-party-dependency/${projectName}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/update-third-party-dependency/${projectName}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/update-third-party-dependency/${projectName}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "814ab8a6_c7a2_4c25_81d2_52809ad71665",
    `${AddOrUpdateThirdPartyRequestBody["814ab8a6_c7a2_4c25_81d2_52809ad71665"]}`,
  );
  bodyFormData.append(
    "da1e203b_10f8_415b_9ad0_23b5fe072bc7",
    `${AddOrUpdateThirdPartyRequestBody["da1e203b_10f8_415b_9ad0_23b5fe072bc7"]}`,
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
