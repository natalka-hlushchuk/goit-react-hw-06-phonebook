import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from '../redux/sliceContacts';
import { filterReducer } from '../redux/sliceFilter';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

const persistedContactReducer = persistReducer(persistConfig, contactReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedContactReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
