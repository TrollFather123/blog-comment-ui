/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IGetUserDataResponse,
  ILoginPayloadBody,
  IRegisterPayloadBody,
  IUserData,
  IUserResponse,
} from "@/interfaces/api.all.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/helper";
import { endpoints } from "@/endpoints/endpoints";
import { destroyCookie, setCookie } from "nookies";
import { AxiosError } from "axios";

const initialState = {
  userLoading: false,
  userData: null as IUserData | null,
};

export const userRegister = createAsyncThunk(
  "register",
  async (payload: IRegisterPayloadBody) => {
    try {
      const res = await axiosInstance.post<IUserResponse>(
        endpoints.user.register,
        payload
      );
      return res?.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err?.message);
      }
    }
  }
);
export const userLogin = createAsyncThunk(
  "login",
  async (payload: ILoginPayloadBody) => {
    try {
      const res = await axiosInstance.post<IUserResponse>(
        endpoints.user.login,
        payload
      );
      return res?.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err?.message);
      }
    }
  }
);

export const currentUser = createAsyncThunk(
  "userdetails",
  async (id:string) => {
    try {
      const res = await axiosInstance.get<IGetUserDataResponse>(`${endpoints.user.details}/${id}`);
      return res?.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err?.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LogoutUser:()=>{
      destroyCookie(null, "token", {
        path: "/",
      });
      destroyCookie(null, "user_id", {
        path: "/",
      });
    }
  },
  extraReducers: (builder) => {
    builder
      // For Register User
      .addCase(userRegister.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.userLoading = false;
          state.userData = payload?.user;
          setCookie(null, "token", payload?.token, {
            path: "/",
          });
          setCookie(null, "user_id", payload?.user?._id, {
            path: "/",
          });
        }
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.userLoading = false;
      })

      // For Login User

      .addCase(userLogin.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.userLoading = false;
          state.userData = payload?.user;
          setCookie(null, "token", payload?.token, {
            path: "/",
          });
          setCookie(null, "user_id", payload?.user?._id, {
            path: "/",
          });
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userLoading = false;
      })

      // For User Details

      .addCase(currentUser.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.userLoading = false;
          state.userData = payload?.user;
        }
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.userLoading = false;
      });
  },
});

export const {LogoutUser} = userSlice.actions;

export default userSlice.reducer;
