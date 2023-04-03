import {createSlice} from '@reduxjs/toolkit';

const userSlicer = createSlice({
  name: 'user',
  initialState: {
    userData: [],
    token: null,
    tempToken: null,
    cardData: [],
    latitude: null,
    longitude: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTempToken: (state, action) => {
      state.tempToken = action.payload;
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setCardData: (state, action) => {
      state.cardData = action.payload;
    },
    SetDelAccount: (state, action) => {
      state.userData = initialState.userData;
      state.token = initialState.token;
      state.tempToken = initialState.tempToken;
      state.cardData = initialState.cardData;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
  },
});

export const {
  setToken,
  setUser,
  setSplash,
  setTempToken,
  setCardData,
  SetDelAccount,
  setLatitude,
  setLongitude,
} = userSlicer.actions;

export default userSlicer.reducer;
