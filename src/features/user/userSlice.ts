import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { IUser } from "interfaces/IUser.interface";

const initialState: IUser = {
	id: "",
	username: "",
	email: "",
	role: "",
	confirmed: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state: IUser, action: PayloadAction<IUser | any>) => {
			return { ...state, ...action.payload };
		},
		deleteUser: (state: IUser) => {
			state = initialState;
			return { ...state };
		}
	},
});

export const { updateUser, deleteUser } = userSlice.actions;

export const selectUser = (state: RootState): IUser => state.user;
export const selectUserID = (state: RootState): string => state.user.id;
export const selectUserRole = (state: RootState): string => state.user.role;

export default userSlice.reducer;
