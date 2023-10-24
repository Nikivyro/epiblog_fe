import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null, // Inizializza con null inizialmente
  reducers: {
    setUser: (state, action) => action.payload,
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => null,
    initializeUser: (state, action) => action.payload, // Nuova azione per inizializzare l'utente
  },
});

export const { setUser, updateUser, clearUser, initializeUser } = userSlice.actions;
export default userSlice.reducer;
