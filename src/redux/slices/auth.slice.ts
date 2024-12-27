import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  id: number | null;
}

const initialState: AuthState = {
  accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  userId: typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).userId
    : null,
  id: typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).id
    : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    },
   
    setUserId(state, action: PayloadAction<{image?:any,id: number; userId: string; firstName: string; lastName: string }>) {
      state.id = action.payload.id;
      state.userId = action.payload.userId;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: action.payload.id,
            userId: action.payload.userId,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            image: action.payload.image,
          })
        );
      }
    },
    clearAuth(state) {
      state.accessToken = null;
      state.userId = null;
      state.id = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("image");
      }
    },
  },
});

export const { setAuth ,setUserId, clearAuth } = authSlice.actions;
export const isAuthenticated = (state: RootState) => !!state.auth.accessToken;
export default authSlice.reducer;
