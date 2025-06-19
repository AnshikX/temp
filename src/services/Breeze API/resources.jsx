import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import {
  requestAuthInterceptorTokenAuthLogin,
  responseAuthInterceptorTokenAuthLogin,
} from "./interceptors";

export const projectCustomPackageDeleteDestroy = async (projectName) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/custom-package-delete/${projectName}`;

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

export const projectCustomPackageUploadCreateJSON = async (
  AddCustomPackageRequestBody,
  projectName,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/custom-package-upload/${projectName}`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...AddCustomPackageRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const projectCustomPackageUploadCreateURLENCODED = async (
  AddCustomPackageRequestBody,
  projectName,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/custom-package-upload/${projectName}`;

  const formBody = Object.entries(AddCustomPackageRequestBody)
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

export const projectCustomPackageUploadCreateFORMDATA = async (
  AddCustomPackageRequestBody,
  projectName,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/custom-package-upload/${projectName}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "2f88196f_d54a_41ee_a5e4_048a0b74fb47",
    `${AddCustomPackageRequestBody["2f88196f_d54a_41ee_a5e4_048a0b74fb47"]}`,
  );
  bodyFormData.append(
    "54c5024c_de9d_4cff_8ad1_887161fd2297",
    `${AddCustomPackageRequestBody["54c5024c_de9d_4cff_8ad1_887161fd2297"]}`,
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

export const projectGetUploadedResourceRetrieve = async (projectName) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/get-uploaded-resource/${projectName}`;

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
