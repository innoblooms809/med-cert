"use server"

import axios from "axios";
// import Cookies from "js-cookie";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const loginUser = async (endpoint: string, payload: any) => {
  try {
    const res: any = await axios.post(`${BASE_URL}${endpoint}`, payload);



    const token = res?.data?.token?.access?.token;
    const expire = res?.data?.token?.access?.expires;

    const cookieStore = await cookies();

    cookieStore.set("token", token);


    return res.data;
  } catch (error: any) {
    console.log(error, "ERRORR");
    return error;
  }
};
