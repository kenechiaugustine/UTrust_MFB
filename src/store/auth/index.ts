import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  user: IUser | null;
}
const initialState: IAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      localStorage.setItem('LOGGED_IN_USER', JSON.stringify(state.user));
    },
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
