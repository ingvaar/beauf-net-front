import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './user/userSlice';
import { trashSlice } from './trash/trashSlice';

export const store = configureStore({
	reducer: {
		[userSlice.name]: userSlice.reducer,
		[trashSlice.name]: trashSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;