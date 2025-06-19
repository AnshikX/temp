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
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/query_resource/${param}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/query_resource/${param}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/project/query_resource/${param}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "4f3b3079_d592_4fb9_b090_ebd014b986a3",
    `${ManageResourceRequestBody["4f3b3079_d592_4fb9_b090_ebd014b986a3"]}`,
  );
  bodyFormData.append(
    "5c9465cd_07e1_4310_af81_d37e1edb91f3",
    `${ManageResourceRequestBody["5c9465cd_07e1_4310_af81_d37e1edb91f3"]}`,
  );
  bodyFormData.append(
    "b4796f94_8fcf_4a61_95c6_09ef852a2437",
    `${ManageResourceRequestBody["b4796f94_8fcf_4a61_95c6_09ef852a2437"]}`,
  );
  bodyFormData.append(
    "518d3c8b_79c4_4266_af08_f85405d92930",
    `${ManageResourceRequestBody["518d3c8b_79c4_4266_af08_f85405d92930"]}`,
  );
  bodyFormData.append(
    "e16fdd19_cb80_4182_9034_b1a9b9da5102",
    `${ManageResourceRequestBody["e16fdd19_cb80_4182_9034_b1a9b9da5102"]}`,
  );
  bodyFormData.append(
    "31fa1936_d990_4e2f_a877_4333d1d75ac3",
    `${ManageResourceRequestBody["31fa1936_d990_4e2f_a877_4333d1d75ac3"]}`,
  );
  bodyFormData.append(
    "431d1f4d_111b_4ad6_a094_15378963e726",
    `${ManageResourceRequestBody["431d1f4d_111b_4ad6_a094_15378963e726"]}`,
  );
  bodyFormData.append(
    "b9421a18_16f9_4ae4_9828_513a5f6e7b56",
    `${ManageResourceRequestBody["b9421a18_16f9_4ae4_9828_513a5f6e7b56"]}`,
  );
  bodyFormData.append(
    "a73c3fed_651e_4542_ba41_d3460609a132",
    `${ManageResourceRequestBody["a73c3fed_651e_4542_ba41_d3460609a132"]}`,
  );
  bodyFormData.append(
    "33bc5700_8f13_4af2_b8c9_c2cb1a70b0d5",
    `${ManageResourceRequestBody["33bc5700_8f13_4af2_b8c9_c2cb1a70b0d5"]}`,
  );
  bodyFormData.append(
    "9fd0bac1_0937_44c4_b0f4_c6f4381c0df9",
    `${ManageResourceRequestBody["9fd0bac1_0937_44c4_b0f4_c6f4381c0df9"]}`,
  );
  bodyFormData.append(
    "c0dc9650_3945_47ca_bd26_f566ffa942fc",
    `${ManageResourceRequestBody["c0dc9650_3945_47ca_bd26_f566ffa942fc"]}`,
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
