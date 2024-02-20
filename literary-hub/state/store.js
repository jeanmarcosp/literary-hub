import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './reducers/userReducer.js';

// Define persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'], // only user state will be persisted
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Combine reducers
const rootReducer = combineReducers({
  user: persistedReducer,
});

// Create store
const store = createStore(rootReducer);

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
