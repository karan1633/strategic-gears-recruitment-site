import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
interface AuthState {
  token: any;
}

const initialState: AuthState = {
  token: "",
};

const storeAccessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    storeToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state?: any) {
      state.token = "";
    },
  },
});

//add data to store
export const get_access_token = (state: RootState) =>
  state.storeAccessTokenSliceRedcuer;

// Export the actions and reducer
export const { storeToken, clearToken } = storeAccessTokenSlice.actions; // Add any actions you want to export
export default storeAccessTokenSlice.reducer;
