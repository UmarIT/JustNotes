import {createSlice} from '@reduxjs/toolkit';

const serviceSlicer = createSlice({
  name: 'service',
  initialState: {
    allServices: [],
    myService: [],
  },
  reducers: {
    setAllServices: (state, action) => {
      state.allServices = action.payload;
    },
    setMyService: (state, action) => {
      state.myService = action.payload;
    },
  },
});

export const {setAllServices, setMyService} = serviceSlicer.actions;

export default serviceSlicer.reducer;
