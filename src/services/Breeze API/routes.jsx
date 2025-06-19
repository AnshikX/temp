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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/routes/add`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/routes/add`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/routes/add`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "0aeb78de_b180_466e_96ab_687126d11b09",
    `${AddRouteRequestBody["0aeb78de_b180_466e_96ab_687126d11b09"]}`,
  );
  bodyFormData.append(
    "e168a3f6_86db_405a_9346_b59591970edd",
    `${AddRouteRequestBody["e168a3f6_86db_405a_9346_b59591970edd"]}`,
  );
  bodyFormData.append(
    "d65c1f42_5ba2_4f97_b37a_6f33f77bc540",
    `${AddRouteRequestBody["d65c1f42_5ba2_4f97_b37a_6f33f77bc540"]}`,
  );
  bodyFormData.append(
    "10e15fd1_cd76_46c8_98ae_16bcfa52e120",
    `${AddRouteRequestBody["10e15fd1_cd76_46c8_98ae_16bcfa52e120"]}`,
  );
  bodyFormData.append(
    "ec28d5eb_bdf4_4f0c_805e_edba94f8e6fe",
    `${AddRouteRequestBody["ec28d5eb_bdf4_4f0c_805e_edba94f8e6fe"]}`,
  );
  bodyFormData.append(
    "06f46f6e_b78a_4111_9646_a1346d3e831f",
    `${AddRouteRequestBody["06f46f6e_b78a_4111_9646_a1346d3e831f"]}`,
  );
  bodyFormData.append(
    "0cb7e34e_8de4_47b7_b3c7_396f8def9299",
    `${AddRouteRequestBody["0cb7e34e_8de4_47b7_b3c7_396f8def9299"]}`,
  );
  bodyFormData.append(
    "030bdc77_b0da_40f6_9df3_0d8c5f2411b4",
    `${AddRouteRequestBody["030bdc77_b0da_40f6_9df3_0d8c5f2411b4"]}`,
  );
  bodyFormData.append(
    "781894fa_94fa_4e49_a9e6_ac77ae35992e",
    `${AddRouteRequestBody["781894fa_94fa_4e49_a9e6_ac77ae35992e"]}`,
  );
  bodyFormData.append(
    "f444cba0_c57b_4420_8715_25f67f020aa4",
    `${AddRouteRequestBody["f444cba0_c57b_4420_8715_25f67f020aa4"]}`,
  );
  bodyFormData.append(
    "dd74ef61_2538_4857_9c2c_a648a7ae101b",
    `${AddRouteRequestBody["dd74ef61_2538_4857_9c2c_a648a7ae101b"]}`,
  );
  bodyFormData.append(
    "c281eb91_239b_4928_9089_c335bd28ab7c",
    `${AddRouteRequestBody["c281eb91_239b_4928_9089_c335bd28ab7c"]}`,
  );
  bodyFormData.append(
    "e30c506a_5a70_41eb_9d6a_7254a581b9ff",
    `${AddRouteRequestBody["e30c506a_5a70_41eb_9d6a_7254a581b9ff"]}`,
  );
  bodyFormData.append(
    "82088384_1932_4fb9_8401_8543eabe38ef",
    `${AddRouteRequestBody["82088384_1932_4fb9_8401_8543eabe38ef"]}`,
  );
  bodyFormData.append(
    "08d299c1_34c3_490b_8d9d_ca7bf2dd7a82",
    `${AddRouteRequestBody["08d299c1_34c3_490b_8d9d_ca7bf2dd7a82"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/routes/delete`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/routes/get-childs`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/routes/get-full-paths`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/routes/update`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/routes/update`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/routes/update`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "ef13031b_cca4_46b5_8769_9d49f71bffe7",
    `${UpdateRouteRequestBody["ef13031b_cca4_46b5_8769_9d49f71bffe7"]}`,
  );
  bodyFormData.append(
    "904d22d5_e0ae_4bb2_8cda_59a3fb00025c",
    `${UpdateRouteRequestBody["904d22d5_e0ae_4bb2_8cda_59a3fb00025c"]}`,
  );
  bodyFormData.append(
    "ad0856f2_5527_4145_b10b_c6819cbce576",
    `${UpdateRouteRequestBody["ad0856f2_5527_4145_b10b_c6819cbce576"]}`,
  );
  bodyFormData.append(
    "5ceea14c_76d3_48d0_af09_13d97942bf6c",
    `${UpdateRouteRequestBody["5ceea14c_76d3_48d0_af09_13d97942bf6c"]}`,
  );
  bodyFormData.append(
    "e6f989cc_8796_4566_a865_08fc4c8aace7",
    `${UpdateRouteRequestBody["e6f989cc_8796_4566_a865_08fc4c8aace7"]}`,
  );
  bodyFormData.append(
    "cdd9d783_9292_49fc_9671_e6b999ab069b",
    `${UpdateRouteRequestBody["cdd9d783_9292_49fc_9671_e6b999ab069b"]}`,
  );
  bodyFormData.append(
    "72ba4e24_5f63_4ce2_b378_317b5abb1a71",
    `${UpdateRouteRequestBody["72ba4e24_5f63_4ce2_b378_317b5abb1a71"]}`,
  );
  bodyFormData.append(
    "17caaddc_552d_4c46_bb8b_ae9b2d40d3d2",
    `${UpdateRouteRequestBody["17caaddc_552d_4c46_bb8b_ae9b2d40d3d2"]}`,
  );
  bodyFormData.append(
    "3a82e7a3_3db9_42ec_8ca2_a8ae0b1287a0",
    `${UpdateRouteRequestBody["3a82e7a3_3db9_42ec_8ca2_a8ae0b1287a0"]}`,
  );
  bodyFormData.append(
    "8c83b829_6ebf_4cdf_b608_a320be719571",
    `${UpdateRouteRequestBody["8c83b829_6ebf_4cdf_b608_a320be719571"]}`,
  );
  bodyFormData.append(
    "39dba708_4e7b_4ff1_83ba_85517a1352c9",
    `${UpdateRouteRequestBody["39dba708_4e7b_4ff1_83ba_85517a1352c9"]}`,
  );
  bodyFormData.append(
    "7be88548_f3a9_4140_ad11_2bde0ed1a80a",
    `${UpdateRouteRequestBody["7be88548_f3a9_4140_ad11_2bde0ed1a80a"]}`,
  );
  bodyFormData.append(
    "b3a05d4a_ce1a_4fa9_8863_9d32c6df6cd9",
    `${UpdateRouteRequestBody["b3a05d4a_ce1a_4fa9_8863_9d32c6df6cd9"]}`,
  );
  bodyFormData.append(
    "36bc089f_0765_444c_8b59_5289b739a3b0",
    `${UpdateRouteRequestBody["36bc089f_0765_444c_8b59_5289b739a3b0"]}`,
  );
  bodyFormData.append(
    "0a45b1ec_3aa2_492c_8061_f81c6242d9bd",
    `${UpdateRouteRequestBody["0a45b1ec_3aa2_492c_8061_f81c6242d9bd"]}`,
  );
  bodyFormData.append(
    "62bf35d8_6f5d_4f16_8daf_fb70e05d68b0",
    `${UpdateRouteRequestBody["62bf35d8_6f5d_4f16_8daf_fb70e05d68b0"]}`,
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
