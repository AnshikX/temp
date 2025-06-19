import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import {
  requestAuthInterceptorTokenAuthLogin,
  responseAuthInterceptorTokenAuthLogin,
} from "./interceptors";

export const projectAddEnvSettingsCreate = async (projectId) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/add-env-settings/${projectId}`;

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

export const projectDeleteEnvSettingsDestroy = async (projectId) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/delete-env-settings/${projectId}`;

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

export const projectGetEnvSettingsRetrieve = async (projectId) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/get-env-settings/${projectId}`;

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

export const projectSetProjEnvCreateJSON = async (
  SetEnvironment,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/set-proj-env/${projectId}`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...SetEnvironment },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const projectSetProjEnvCreateURLENCODED = async (
  SetEnvironment,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/set-proj-env/${projectId}`;

  const formBody = Object.entries(SetEnvironment)
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

export const projectSetProjEnvCreateFORMDATA = async (
  SetEnvironment,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/set-proj-env/${projectId}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "18608981_3fef_4110_b7cf_c374b2acfd71",
    `${SetEnvironment["18608981_3fef_4110_b7cf_c374b2acfd71"]}`,
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

export const projectUpdateEnvSettingsUpdate = async (projectId) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/update-env-settings/${projectId}`;

  const api = {
    method: "put",
    url: url,
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};
