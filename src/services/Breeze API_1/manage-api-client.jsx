import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import {
  requestAuthInterceptorTokenAuthLogin,
  responseAuthInterceptorTokenAuthLogin,
} from "./interceptors";

export const configEditorManageApiClientAddModuleCreateJSON = async (
  AddModuleRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/add-module`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...AddModuleRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorManageApiClientAddModuleCreateURLENCODED = async (
  AddModuleRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/add-module`;

  const formBody = Object.entries(AddModuleRequestBody)
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

export const configEditorManageApiClientAddModuleCreateFORMDATA = async (
  AddModuleRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/add-module`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "0166e837_9364_4c6c_8703_0fa9059cb3e4",
    `${AddModuleRequestBody["0166e837_9364_4c6c_8703_0fa9059cb3e4"]}`,
  );
  bodyFormData.append(
    "41fa2f5a_f850_455e_8c0b_f403829a8d24",
    `${AddModuleRequestBody["41fa2f5a_f850_455e_8c0b_f403829a8d24"]}`,
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

export const configEditorManageApiClientAddSchemaCreateJSON = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/add-schema`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...AddOrEditSwagger },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorManageApiClientAddSchemaCreateURLENCODED = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/add-schema`;

  const formBody = Object.entries(AddOrEditSwagger)
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

export const configEditorManageApiClientAddSchemaCreateFORMDATA = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/add-schema`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "858a94ff_dbd2_4852_b9f0_077522ea1930",
    `${AddOrEditSwagger["858a94ff_dbd2_4852_b9f0_077522ea1930"]}`,
  );
  bodyFormData.append(
    "a51d7bf8_a19c_454c_8e1f_68ccf3cc2222",
    `${AddOrEditSwagger["a51d7bf8_a19c_454c_8e1f_68ccf3cc2222"]}`,
  );
  bodyFormData.append(
    "f087dcfd_ac37_4ade_91d8_ea244ec3b047",
    `${AddOrEditSwagger["f087dcfd_ac37_4ade_91d8_ea244ec3b047"]}`,
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

export const configEditorManageApiClientAddSchemaUpdateJSON = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/add-schema`;

  const api = {
    method: "put",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...AddOrEditSwagger },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorManageApiClientAddSchemaUpdateURLENCODED = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/add-schema`;

  const formBody = Object.entries(AddOrEditSwagger)
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

export const configEditorManageApiClientAddSchemaUpdateFORMDATA = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/add-schema`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "858a94ff_dbd2_4852_b9f0_077522ea1930",
    `${AddOrEditSwagger["858a94ff_dbd2_4852_b9f0_077522ea1930"]}`,
  );
  bodyFormData.append(
    "a51d7bf8_a19c_454c_8e1f_68ccf3cc2222",
    `${AddOrEditSwagger["a51d7bf8_a19c_454c_8e1f_68ccf3cc2222"]}`,
  );
  bodyFormData.append(
    "f087dcfd_ac37_4ade_91d8_ea244ec3b047",
    `${AddOrEditSwagger["f087dcfd_ac37_4ade_91d8_ea244ec3b047"]}`,
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

export const configEditorManageApiClientConvertStandardJsonCreate = async (
  manageApiClientConvertStandardJsonPost,
  collectionType,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/convert-standard-json/${collectionType}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "166d2e61_8fcf_4d96_aef5_590ca0f62b72",
    `${manageApiClientConvertStandardJsonPost["166d2e61_8fcf_4d96_aef5_590ca0f62b72"]}`,
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

export const configEditorManageApiClientDeleteSchemaDestroy = async (
  moduleId,
  projectId,
  schemaId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/delete-schema/${schemaId}/${moduleId}`;

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

export const configEditorManageApiClientEditFunctionConfigCreateJSON = async (
  ModifyFunctionConfigRequestBody,
  operation,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-function-config/${operation}`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...ModifyFunctionConfigRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorManageApiClientEditFunctionConfigCreateURLENCODED =
  async (ModifyFunctionConfigRequestBody, operation, projectId) => {
    const localInstance = duplicateInstance(moduleInstance);
    let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-function-config/${operation}`;

    const formBody = Object.entries(ModifyFunctionConfigRequestBody)
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

    localInstance.interceptors.request.use(
      requestAuthInterceptorTokenAuthLogin,
    );
    localInstance.interceptors.response.use(
      responseAuthInterceptorTokenAuthLogin,
    );

    let resp = await localInstance.request(api);

    return resp.data;
  };

export const configEditorManageApiClientEditFunctionConfigCreateFORMDATA =
  async (ModifyFunctionConfigRequestBody, operation, projectId) => {
    const localInstance = duplicateInstance(moduleInstance);
    let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-function-config/${operation}`;

    let bodyFormData = new FormData();
    bodyFormData.append(
      "ea492a12_d822_4221_b16b_0c77b6f1e20f",
      `${ModifyFunctionConfigRequestBody["ea492a12_d822_4221_b16b_0c77b6f1e20f"]}`,
    );
    bodyFormData.append(
      "14aa8bcf_130a_4f17_ac42_bcbb795da8fd",
      `${ModifyFunctionConfigRequestBody["14aa8bcf_130a_4f17_ac42_bcbb795da8fd"]}`,
    );
    bodyFormData.append(
      "bf0ead8d_b7f8_46f2_95b3_dc7cf2a25aa8",
      `${ModifyFunctionConfigRequestBody["bf0ead8d_b7f8_46f2_95b3_dc7cf2a25aa8"]}`,
    );
    bodyFormData.append(
      "b6f2d472_eda4_4500_9dc4_ede59c734d79",
      `${ModifyFunctionConfigRequestBody["b6f2d472_eda4_4500_9dc4_ede59c734d79"]}`,
    );
    const api = {
      method: "post",
      url: url,
      headers: { "content-type": "multipart/form-data" },
      data: bodyFormData,
    };

    localInstance.interceptors.request.use(
      requestAuthInterceptorTokenAuthLogin,
    );
    localInstance.interceptors.response.use(
      responseAuthInterceptorTokenAuthLogin,
    );

    let resp = await localInstance.request(api);

    return resp.data;
  };

export const configEditorManageApiClientEditModuleTitleCreateJSON = async (
  EditModuleTitle,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-module-title`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...EditModuleTitle },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorManageApiClientEditModuleTitleCreateURLENCODED =
  async (EditModuleTitle, projectId) => {
    const localInstance = duplicateInstance(moduleInstance);
    let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-module-title`;

    const formBody = Object.entries(EditModuleTitle)
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

    localInstance.interceptors.request.use(
      requestAuthInterceptorTokenAuthLogin,
    );
    localInstance.interceptors.response.use(
      responseAuthInterceptorTokenAuthLogin,
    );

    let resp = await localInstance.request(api);

    return resp.data;
  };

export const configEditorManageApiClientEditModuleTitleCreateFORMDATA = async (
  EditModuleTitle,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-module-title`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "cf2f2450_60fe_4e57_9ddd_e8cc7f6fd369",
    `${EditModuleTitle["cf2f2450_60fe_4e57_9ddd_e8cc7f6fd369"]}`,
  );
  bodyFormData.append(
    "1731a3c0_0894_4c57_8009_daabda1a20b5",
    `${EditModuleTitle["1731a3c0_0894_4c57_8009_daabda1a20b5"]}`,
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

export const configEditorManageApiClientEditSchemaCreateJSON = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-schema`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...AddOrEditSwagger },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorManageApiClientEditSchemaCreateURLENCODED = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-schema`;

  const formBody = Object.entries(AddOrEditSwagger)
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

export const configEditorManageApiClientEditSchemaCreateFORMDATA = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-schema`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "858a94ff_dbd2_4852_b9f0_077522ea1930",
    `${AddOrEditSwagger["858a94ff_dbd2_4852_b9f0_077522ea1930"]}`,
  );
  bodyFormData.append(
    "a51d7bf8_a19c_454c_8e1f_68ccf3cc2222",
    `${AddOrEditSwagger["a51d7bf8_a19c_454c_8e1f_68ccf3cc2222"]}`,
  );
  bodyFormData.append(
    "f087dcfd_ac37_4ade_91d8_ea244ec3b047",
    `${AddOrEditSwagger["f087dcfd_ac37_4ade_91d8_ea244ec3b047"]}`,
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

export const configEditorManageApiClientEditSchemaUpdateJSON = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-schema`;

  const api = {
    method: "put",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...AddOrEditSwagger },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorManageApiClientEditSchemaUpdateURLENCODED = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-schema`;

  const formBody = Object.entries(AddOrEditSwagger)
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

export const configEditorManageApiClientEditSchemaUpdateFORMDATA = async (
  AddOrEditSwagger,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/edit-schema`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "858a94ff_dbd2_4852_b9f0_077522ea1930",
    `${AddOrEditSwagger["858a94ff_dbd2_4852_b9f0_077522ea1930"]}`,
  );
  bodyFormData.append(
    "a51d7bf8_a19c_454c_8e1f_68ccf3cc2222",
    `${AddOrEditSwagger["a51d7bf8_a19c_454c_8e1f_68ccf3cc2222"]}`,
  );
  bodyFormData.append(
    "f087dcfd_ac37_4ade_91d8_ea244ec3b047",
    `${AddOrEditSwagger["f087dcfd_ac37_4ade_91d8_ea244ec3b047"]}`,
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

export const configEditorManageApiClientResolveSchemaCreate = async (
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/resolve-schema`;

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

export const configEditorManageApiClientRetrieveResponseTokensRetrieve = async (
  apiId,
  moduleId,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/retrieve-response-tokens/${moduleId}/${apiId}`;

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

export const configEditorManageApiClientTransferToAuthCreateJSON = async (
  TransferToAuthRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/transfer-to-auth`;

  const api = {
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
    data: { ...TransferToAuthRequestBody },
  };

  localInstance.interceptors.request.use(requestAuthInterceptorTokenAuthLogin);
  localInstance.interceptors.response.use(
    responseAuthInterceptorTokenAuthLogin,
  );

  let resp = await localInstance.request(api);

  return resp.data;
};

export const configEditorManageApiClientTransferToAuthCreateURLENCODED = async (
  TransferToAuthRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/transfer-to-auth`;

  const formBody = Object.entries(TransferToAuthRequestBody)
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

export const configEditorManageApiClientTransferToAuthCreateFORMDATA = async (
  TransferToAuthRequestBody,
  projectId,
) => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `${import.meta.env.VITE_BREEZE_API_1}api/config-editor/${projectId}/manage-api-client/transfer-to-auth`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "c2ad1506_762d_4e59_9957_46f0726ebfce",
    `${TransferToAuthRequestBody["c2ad1506_762d_4e59_9957_46f0726ebfce"]}`,
  );
  bodyFormData.append(
    "fda0a722_40f6_4d10_a22d_fbf55bb44671",
    `${TransferToAuthRequestBody["fda0a722_40f6_4d10_a22d_fbf55bb44671"]}`,
  );
  bodyFormData.append(
    "5da28872_eee3_4416_803b_7c8b0968c096",
    `${TransferToAuthRequestBody["5da28872_eee3_4416_803b_7c8b0968c096"]}`,
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
