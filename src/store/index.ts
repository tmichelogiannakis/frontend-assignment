import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit';
import vesselTrackReducer from './vessel-track/vessel-track.slice';

const rootReducer = combineReducers({
  'vessel-track': vesselTrackReducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const store = configureStore({
  reducer: rootReducer
});
