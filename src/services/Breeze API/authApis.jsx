import axios from "axios";
import { duplicateInstance } from "../interceptors";
import { moduleInstance } from "./interceptors";
import router from "/src/Routing.jsx";
export const clearAuthSessionBreezeAPI = async () => {};

export const tokenAuthLogin = async () => {
  const localInstance = duplicateInstance(moduleInstance);
  let url = `http://localhost:8000`;

  const api = {
    method: "post",
    url: url,
  };

  let resp = await localInstance.request(api);

  return resp.data;
};
