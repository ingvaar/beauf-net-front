import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { IQuotePrivate } from "interfaces/IQuotePrivate.interface";

type QuotesTrash = Array<IQuotePrivate>;

const initialState: QuotesTrash = [];

export const trashSlice = createSlice({
	name: "trash",
	initialState,
	reducers: {
		addQuoteToTrash: (state: QuotesTrash, action: PayloadAction<IQuotePrivate>) => {
			state.push(action.payload);
		},
		emptyTrash: (state: QuotesTrash) => {
			return [];
		},
		removeQuoteFromTrash: (state: QuotesTrash, action: PayloadAction<IQuotePrivate>) => {
			return state.filter((quote: IQuotePrivate) => {
				return !(quote.id === action.payload.id);
			})
		},
	},
});

export const { addQuoteToTrash, emptyTrash, removeQuoteFromTrash } = trashSlice.actions;

export const selectTrash = (state: RootState): QuotesTrash => state.trash;

export default trashSlice.reducer;