import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/root-reducer';
interface MailIDState {
  mail_id: any;
}

const initialState: MailIDState = {
  mail_id: '',
};

const storeUserMailID = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    storeMailID(state, action) {
      console.log('email', action.payload);
      state.mail_id = action.payload;
    },
  },
});

//add data to store
export const get_mail = (state: RootState) => state.storeUserMailIDReducer;

// Export the actions and reducer
export const { storeMailID } = storeUserMailID.actions; // Add any actions you want to export
export default storeUserMailID.reducer;
