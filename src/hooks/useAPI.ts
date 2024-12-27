import { useDynamicRequestMutation } from "../redux/services/api";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';  

export const useApi = () => {
  const [dynamicRequest, result] = useDynamicRequestMutation();

  const API = {
    get: async (url: string, body?: any ) => {
      try {
        const response = await dynamicRequest({ method: 'GET', url, body }).unwrap();
        return { success: true, data: response.data ,count:response.count};
      } catch (error: FetchBaseQueryError | Error | any) {  // Specify FetchBaseQueryError or a fallback Error
        return { success: false, error: error.data?.error || error };
      }
    },
    post: async (url: string, body?: any ) => {
      try {
        const response = await dynamicRequest({ method: 'POST', url, body }).unwrap();
        return { success: true, data: response.data };
      } catch (error: FetchBaseQueryError | Error | any) {
        return { success: false, error: error.data?.error || error };
      }
    },
    put: async (url: string, body?: any ) => {
      try {
        const response = await dynamicRequest({ method: 'PUT', url, body }).unwrap();
        return { success: true, data: response.data };
      } catch (error: FetchBaseQueryError | Error | any) {
        return { success: false, error: error.data?.error || error };
      }
    },
    delete: async (url: string, body?: any ) => {
      try {
        const response = await dynamicRequest({ method: 'DELETE', url, body }).unwrap();
        return { success: true, data: response.data };
      } catch (error: FetchBaseQueryError | Error | any) {
        return { success: false, error: error.data?.error || error };
      }
    },
    postFile: async (url: string, file: File) => {  
      try {
        const response = await dynamicRequest({ method: 'POST', url, body: file }).unwrap();
        return { success: true, data: response.data }; 
      } catch (error: FetchBaseQueryError | Error | any) {
        return { success: false, error: error.data?.error || error };
      }
    },
  }

  return { API, result };
};
