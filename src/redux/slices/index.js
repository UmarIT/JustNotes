import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {apiHandler} from '../../services/service';
import userReducer from './userSlice';
import serviceReducer from './serviceSlice';
const rootReducer = combineReducers({
  user: userReducer,
  service: serviceReducer,

  [apiHandler.reducerPath]: apiHandler.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'service'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const root = (state, action) => {
  if (action.type === 'user/SetDelAccount') {
    AsyncStorage.removeItem('persist:root');
    return persistedReducer(undefined, action);
  } else {
    return persistedReducer(state, action);
  }
};

export default root;
