"use server";
import { instance, instanceForFormdata } from "@/api/axios/CRMAxios";

export const getData = async (endpoint: any) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};



export const postData = async (
  endpoint: any,
  data: any,
  header = "application"
) => {
  try {
    const response = await instance.post(endpoint, data);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const putData = async (endpoint: any, data: any) => {
  try {
    const response = await instance.put(endpoint, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const pathData = async (
  endpoint: any,
  data: any,
  header = "application"
) => {
  try {
    const response =
      header === "formData"
        ? await instanceForFormdata.patch(endpoint, data)
        : await instance.patch(endpoint, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (endpoint: any) => {
  try {
    const response = await instance.delete(endpoint);
    return response.data;
  } catch (error) {
    return error;
  }
};
