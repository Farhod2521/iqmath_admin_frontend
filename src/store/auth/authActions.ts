import { getLoginCallBack, getSapCallBack, getUserMe } from "@/http";
import { setAuth } from "@/utils/token";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actionLogin = createAsyncThunk(
  "auth/login",
  async (code: string | null, thunkAPI) => {
    try {
      const response = await getLoginCallBack(code);
      setAuth(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const actionSapLogin = createAsyncThunk(
  "auth/saplogin",
  async (id: string | null, thunkAPI) => {
    try {
      const response = await getSapCallBack(id);
      setAuth(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const actionGetMe = createAsyncThunk("auth/me", async () => {
  const response = await getUserMe();
  return response;
});
