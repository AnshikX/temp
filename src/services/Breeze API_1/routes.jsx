import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import {
  requestAuthInterceptorTokenAuthLogin,
  responseAuthInterceptorTokenAuthLogin,
} from "./interceptors";

export const configEditorRoutesAddCreateJSON = async (
  AddRouteRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/routes/add`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...AddRouteRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorRoutesAddCreateURLENCODED = async (
  AddRouteRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/routes/add`;

  const formBody = Object.entries(AddRouteRequestBody)
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

export const configEditorRoutesAddCreateFORMDATA = async (
  AddRouteRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/routes/add`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "81020031_5d15_4000_9a82_e5a4da7a5ab0",
    `${AddRouteRequestBody["81020031_5d15_4000_9a82_e5a4da7a5ab0"]}`,
  );
  bodyFormData.append(
    "df952a1c_3356_4656_b5da_aef46481db39",
    `${AddRouteRequestBody["df952a1c_3356_4656_b5da_aef46481db39"]}`,
  );
  bodyFormData.append(
    "21ce00d3_13fe_4b34_9cdb_1e7a385ef69f",
    `${AddRouteRequestBody["21ce00d3_13fe_4b34_9cdb_1e7a385ef69f"]}`,
  );
  bodyFormData.append(
    "468f3995_0011_48b8_8d23_3e074e208df7",
    `${AddRouteRequestBody["468f3995_0011_48b8_8d23_3e074e208df7"]}`,
  );
  bodyFormData.append(
    "18a4551c_d5d7_4d26_8fad_63a24f66a39b",
    `${AddRouteRequestBody["18a4551c_d5d7_4d26_8fad_63a24f66a39b"]}`,
  );
  bodyFormData.append(
    "6a17768a_0c01_41d4_a86b_40a06a21c728",
    `${AddRouteRequestBody["6a17768a_0c01_41d4_a86b_40a06a21c728"]}`,
  );
  bodyFormData.append(
    "cb902bd3_9fac_49f9_a7d1_ca0f7b65e0ff",
    `${AddRouteRequestBody["cb902bd3_9fac_49f9_a7d1_ca0f7b65e0ff"]}`,
  );
  bodyFormData.append(
    "f85bc7a2_923b_4b56_8771_3641c800b935",
    `${AddRouteRequestBody["f85bc7a2_923b_4b56_8771_3641c800b935"]}`,
  );
  bodyFormData.append(
    "8fee5746_5fe3_4d27_b66d_c31df2f4ac2a",
    `${AddRouteRequestBody["8fee5746_5fe3_4d27_b66d_c31df2f4ac2a"]}`,
  );
  bodyFormData.append(
    "c5f8a1ce_8383_4300_b045_0687d96fccdd",
    `${AddRouteRequestBody["c5f8a1ce_8383_4300_b045_0687d96fccdd"]}`,
  );
  bodyFormData.append(
    "3a6e0768_8502_4e64_a1af_1368256b93ac",
    `${AddRouteRequestBody["3a6e0768_8502_4e64_a1af_1368256b93ac"]}`,
  );
  bodyFormData.append(
    "997aaa7c_ca6a_4691_8689_be6357798f3c",
    `${AddRouteRequestBody["997aaa7c_ca6a_4691_8689_be6357798f3c"]}`,
  );
  bodyFormData.append(
    "9d4f2451_36ff_4657_8940_f985efb159f2",
    `${AddRouteRequestBody["9d4f2451_36ff_4657_8940_f985efb159f2"]}`,
  );
  bodyFormData.append(
    "e455770f_cb52_4a8d_9b82_70213f74fc3f",
    `${AddRouteRequestBody["e455770f_cb52_4a8d_9b82_70213f74fc3f"]}`,
  );
  bodyFormData.append(
    "aa45e3d6_0511_4a3c_855d_12a95239c588",
    `${AddRouteRequestBody["aa45e3d6_0511_4a3c_855d_12a95239c588"]}`,
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

export const configEditorRoutesDeleteDestroy = async (projectId) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/routes/delete`;

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

export const configEditorRoutesGetChildsRetrieve = async (
  projectId,
  target_id,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/routes/get-childs`;

  const queryParams = { "target-id": target_id };
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(
      ([_, value]) => value !== null && value !== "" && value !== undefined,
    ),
  );
  const queryString = new URLSearchParams(filteredParams).toString();

  if (queryString) {
    url += `?${queryString}`;
  }

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

export const configEditorRoutesGetFullPathsRetrieve = async (
  projectId,
  target_id,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/routes/get-full-paths`;

  const queryParams = { "target-id": target_id };
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(
      ([_, value]) => value !== null && value !== "" && value !== undefined,
    ),
  );
  const queryString = new URLSearchParams(filteredParams).toString();

  if (queryString) {
    url += `?${queryString}`;
  }

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

export const configEditorRoutesUpdateUpdateJSON = async (
  UpdateRouteRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/routes/update`;

  const api = {
    method: "put",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...UpdateRouteRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorRoutesUpdateUpdateURLENCODED = async (
  UpdateRouteRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/routes/update`;

  const formBody = Object.entries(UpdateRouteRequestBody)
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

export const configEditorRoutesUpdateUpdateFORMDATA = async (
  UpdateRouteRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/routes/update`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "a7492f47_f5b8_4a9c_a872_48af97aa9481",
    `${UpdateRouteRequestBody["a7492f47_f5b8_4a9c_a872_48af97aa9481"]}`,
  );
  bodyFormData.append(
    "5ff3cdd9_47c5_4e47_bf2d_016db9cd47d7",
    `${UpdateRouteRequestBody["5ff3cdd9_47c5_4e47_bf2d_016db9cd47d7"]}`,
  );
  bodyFormData.append(
    "e8163bbd_c433_4c41_8311_eed39bfa19d0",
    `${UpdateRouteRequestBody["e8163bbd_c433_4c41_8311_eed39bfa19d0"]}`,
  );
  bodyFormData.append(
    "c06bec57_b94e_4e7d_972d_e3194a5f12ff",
    `${UpdateRouteRequestBody["c06bec57_b94e_4e7d_972d_e3194a5f12ff"]}`,
  );
  bodyFormData.append(
    "81e61690_9d72_4a24_9691_029433bd734d",
    `${UpdateRouteRequestBody["81e61690_9d72_4a24_9691_029433bd734d"]}`,
  );
  bodyFormData.append(
    "46cfc021_058e_4ed6_acae_14307e7af9e6",
    `${UpdateRouteRequestBody["46cfc021_058e_4ed6_acae_14307e7af9e6"]}`,
  );
  bodyFormData.append(
    "c2e2b101_6adc_4848_846e_c1af6a7fb01a",
    `${UpdateRouteRequestBody["c2e2b101_6adc_4848_846e_c1af6a7fb01a"]}`,
  );
  bodyFormData.append(
    "f4c6a62c_7610_4433_a607_2e4fe5ba702d",
    `${UpdateRouteRequestBody["f4c6a62c_7610_4433_a607_2e4fe5ba702d"]}`,
  );
  bodyFormData.append(
    "3f96e9a7_f745_4b66_b6f7_6ece3935cfd4",
    `${UpdateRouteRequestBody["3f96e9a7_f745_4b66_b6f7_6ece3935cfd4"]}`,
  );
  bodyFormData.append(
    "de967514_389d_44fc_abb1_c895725ed957",
    `${UpdateRouteRequestBody["de967514_389d_44fc_abb1_c895725ed957"]}`,
  );
  bodyFormData.append(
    "56b9dbd8_aeea_408e_b289_9de6569e95fe",
    `${UpdateRouteRequestBody["56b9dbd8_aeea_408e_b289_9de6569e95fe"]}`,
  );
  bodyFormData.append(
    "e7fb7681_33b8_4b4d_ae9f_38ee9577c6b3",
    `${UpdateRouteRequestBody["e7fb7681_33b8_4b4d_ae9f_38ee9577c6b3"]}`,
  );
  bodyFormData.append(
    "8520bdf2_d8b2_4321_bf71_dba5e6e9d13b",
    `${UpdateRouteRequestBody["8520bdf2_d8b2_4321_bf71_dba5e6e9d13b"]}`,
  );
  bodyFormData.append(
    "26e82bce_5982_4870_a8a5_098573fe29af",
    `${UpdateRouteRequestBody["26e82bce_5982_4870_a8a5_098573fe29af"]}`,
  );
  bodyFormData.append(
    "2c79f561_7c77_408e_8ffd_a6e3016cdad4",
    `${UpdateRouteRequestBody["2c79f561_7c77_408e_8ffd_a6e3016cdad4"]}`,
  );
  bodyFormData.append(
    "e4ddd160_a91e_48f5_b3de_dc224aa72314",
    `${UpdateRouteRequestBody["e4ddd160_a91e_48f5_b3de_dc224aa72314"]}`,
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
