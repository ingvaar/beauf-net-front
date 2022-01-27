import { IQuotePrivate } from "./IQuotePrivate.interface";

export interface IQuotesPrivatePage {
	page: number,
	perPage: number,
	total: number,
	data: Array<IQuotePrivate>
}