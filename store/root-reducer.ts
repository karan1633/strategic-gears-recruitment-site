import { combineReducers } from '@reduxjs/toolkit';
import storeAccessTokenSlice from '../store/slices/token-slice';
import storeUserMailID from '../store/slices/store-user-id';
const appReducer = combineReducers({
  storeAccessTokenSliceRedcuer: storeAccessTokenSlice,
  storeUserMailIDReducer: storeUserMailID,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'Login/LogoutSuccess') {
    state = undefined;

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
