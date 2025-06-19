import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import {
  requestAuthInterceptorTokenAuthLogin,
  responseAuthInterceptorTokenAuthLogin,
} from "./interceptors";

export const projectQueryResourceCreateJSON = async (
  ManageResourceRequestBody,
  param,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/query_resource/${param}`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...ManageResourceRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const projectQueryResourceCreateURLENCODED = async (
  ManageResourceRequestBody,
  param,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/query_resource/${param}`;

  const formBody = Object.entries(ManageResourceRequestBody)
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

export const projectQueryResourceCreateFORMDATA = async (
  ManageResourceRequestBody,
  param,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API}api/project/query_resource/${param}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "1bbf735f_5689_42c2_a681_85a654ab5175",
    `${ManageResourceRequestBody["1bbf735f_5689_42c2_a681_85a654ab5175"]}`,
  );
  bodyFormData.append(
    "8fb8c4fd_184d_44c8_9e84_04ab8d62a1b1",
    `${ManageResourceRequestBody["8fb8c4fd_184d_44c8_9e84_04ab8d62a1b1"]}`,
  );
  bodyFormData.append(
    "b048cc46_b859_459e_ad10_3e65bd3e8c29",
    `${ManageResourceRequestBody["b048cc46_b859_459e_ad10_3e65bd3e8c29"]}`,
  );
  bodyFormData.append(
    "b01d2215_5c45_4a3f_bca1_eac75e2df8b3",
    `${ManageResourceRequestBody["b01d2215_5c45_4a3f_bca1_eac75e2df8b3"]}`,
  );
  bodyFormData.append(
    "62c1c973_424d_4a4c_8908_7ba763795b0a",
    `${ManageResourceRequestBody["62c1c973_424d_4a4c_8908_7ba763795b0a"]}`,
  );
  bodyFormData.append(
    "f6f5c6b1_163a_46ad_bfbc_4f5539de8de7",
    `${ManageResourceRequestBody["f6f5c6b1_163a_46ad_bfbc_4f5539de8de7"]}`,
  );
  bodyFormData.append(
    "35fdf84e_7776_4a6a_8d84_947998f95fd8",
    `${ManageResourceRequestBody["35fdf84e_7776_4a6a_8d84_947998f95fd8"]}`,
  );
  bodyFormData.append(
    "c5f4caec_7008_4e8a_a44b_5a8e6da63b38",
    `${ManageResourceRequestBody["c5f4caec_7008_4e8a_a44b_5a8e6da63b38"]}`,
  );
  bodyFormData.append(
    "a80ac6df_4b43_4641_ab08_f6dab3d65a24",
    `${ManageResourceRequestBody["a80ac6df_4b43_4641_ab08_f6dab3d65a24"]}`,
  );
  bodyFormData.append(
    "b0ce7206_842a_4def_8e79_2593780bb067",
    `${ManageResourceRequestBody["b0ce7206_842a_4def_8e79_2593780bb067"]}`,
  );
  bodyFormData.append(
    "c80db02d_7897_45a4_be6d_b72c98308280",
    `${ManageResourceRequestBody["c80db02d_7897_45a4_be6d_b72c98308280"]}`,
  );
  bodyFormData.append(
    "30a99f8c_00e2_445f_a427_11ca38a245dd",
    `${ManageResourceRequestBody["30a99f8c_00e2_445f_a427_11ca38a245dd"]}`,
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
