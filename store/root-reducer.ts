import { combineReducers } from "@reduxjs/toolkit";
import storeAccessTokenSlice from "../store/slices/token-slice";
const appReducer = combineReducers({
  storeAccessTokenSliceRedcuer: storeAccessTokenSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "Login/LogoutSuccess") {
    state = undefined;

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
