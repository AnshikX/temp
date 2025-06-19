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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/add-module`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/add-module`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/add-module`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "2ca1d251_114c_4180_9939_d8bb1cf3090f",
    `${AddModuleRequestBody["2ca1d251_114c_4180_9939_d8bb1cf3090f"]}`,
  );
  bodyFormData.append(
    "b5a4cbad_d2aa_429c_a87c_086d3df30602",
    `${AddModuleRequestBody["b5a4cbad_d2aa_429c_a87c_086d3df30602"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/add-schema`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/add-schema`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/add-schema`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "aa67cfdd_f148_431a_8963_5bdd5665c531",
    `${AddOrEditSwagger["aa67cfdd_f148_431a_8963_5bdd5665c531"]}`,
  );
  bodyFormData.append(
    "596f0364_fa6b_455c_9651_c565453bcc10",
    `${AddOrEditSwagger["596f0364_fa6b_455c_9651_c565453bcc10"]}`,
  );
  bodyFormData.append(
    "5a60fb28_47bc_42f9_b7f8_556a5b1df182",
    `${AddOrEditSwagger["5a60fb28_47bc_42f9_b7f8_556a5b1df182"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/add-schema`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/add-schema`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/add-schema`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "aa67cfdd_f148_431a_8963_5bdd5665c531",
    `${AddOrEditSwagger["aa67cfdd_f148_431a_8963_5bdd5665c531"]}`,
  );
  bodyFormData.append(
    "596f0364_fa6b_455c_9651_c565453bcc10",
    `${AddOrEditSwagger["596f0364_fa6b_455c_9651_c565453bcc10"]}`,
  );
  bodyFormData.append(
    "5a60fb28_47bc_42f9_b7f8_556a5b1df182",
    `${AddOrEditSwagger["5a60fb28_47bc_42f9_b7f8_556a5b1df182"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/convert-standard-json/${collectionType}`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "9296e856_e1ab_4099_acd7_bc8ab69c46e1",
    `${manageApiClientConvertStandardJsonPost["9296e856_e1ab_4099_acd7_bc8ab69c46e1"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/delete-schema/${schemaId}/${moduleId}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-function-config/${operation}`;

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
    let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-function-config/${operation}`;

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
    let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-function-config/${operation}`;

    let bodyFormData = new FormData();
    bodyFormData.append(
      "bd619c12_5310_4178_ac65_7ff8064a605b",
      `${ModifyFunctionConfigRequestBody["bd619c12_5310_4178_ac65_7ff8064a605b"]}`,
    );
    bodyFormData.append(
      "35af7498_143e_4e6e_936f_1ab681ccdda8",
      `${ModifyFunctionConfigRequestBody["35af7498_143e_4e6e_936f_1ab681ccdda8"]}`,
    );
    bodyFormData.append(
      "3f6b76cc_fb04_4674_95b9_2f96b51b806b",
      `${ModifyFunctionConfigRequestBody["3f6b76cc_fb04_4674_95b9_2f96b51b806b"]}`,
    );
    bodyFormData.append(
      "ae507b2d_abe3_492e_9f31_91be723467d0",
      `${ModifyFunctionConfigRequestBody["ae507b2d_abe3_492e_9f31_91be723467d0"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-module-title`;

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
    let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-module-title`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-module-title`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "c0a27d50_b00a_42d0_a375_cce20a8479dc",
    `${EditModuleTitle["c0a27d50_b00a_42d0_a375_cce20a8479dc"]}`,
  );
  bodyFormData.append(
    "f58708a0_15b3_4450_9a7f_57df1956168f",
    `${EditModuleTitle["f58708a0_15b3_4450_9a7f_57df1956168f"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-schema`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-schema`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-schema`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "aa67cfdd_f148_431a_8963_5bdd5665c531",
    `${AddOrEditSwagger["aa67cfdd_f148_431a_8963_5bdd5665c531"]}`,
  );
  bodyFormData.append(
    "596f0364_fa6b_455c_9651_c565453bcc10",
    `${AddOrEditSwagger["596f0364_fa6b_455c_9651_c565453bcc10"]}`,
  );
  bodyFormData.append(
    "5a60fb28_47bc_42f9_b7f8_556a5b1df182",
    `${AddOrEditSwagger["5a60fb28_47bc_42f9_b7f8_556a5b1df182"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-schema`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-schema`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/edit-schema`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "aa67cfdd_f148_431a_8963_5bdd5665c531",
    `${AddOrEditSwagger["aa67cfdd_f148_431a_8963_5bdd5665c531"]}`,
  );
  bodyFormData.append(
    "596f0364_fa6b_455c_9651_c565453bcc10",
    `${AddOrEditSwagger["596f0364_fa6b_455c_9651_c565453bcc10"]}`,
  );
  bodyFormData.append(
    "5a60fb28_47bc_42f9_b7f8_556a5b1df182",
    `${AddOrEditSwagger["5a60fb28_47bc_42f9_b7f8_556a5b1df182"]}`,
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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/resolve-schema`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/retrieve-response-tokens/${moduleId}/${apiId}`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/transfer-to-auth`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/transfer-to-auth`;

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
  let url = `${import.meta.env.VITE_BREEZE_API}api/config-editor/${projectId}/manage-api-client/transfer-to-auth`;

  let bodyFormData = new FormData();
  bodyFormData.append(
    "7c15abb0_2ce7_4a67_8622_011d0edb6a5b",
    `${TransferToAuthRequestBody["7c15abb0_2ce7_4a67_8622_011d0edb6a5b"]}`,
  );
  bodyFormData.append(
    "b5449077_ef89_40f2_befe_9b51ce893f1a",
    `${TransferToAuthRequestBody["b5449077_ef89_40f2_befe_9b51ce893f1a"]}`,
  );
  bodyFormData.append(
    "d28456c4_d13b_4d4e_8a91_36fc151886c4",
    `${TransferToAuthRequestBody["d28456c4_d13b_4d4e_8a91_36fc151886c4"]}`,
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
