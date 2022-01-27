import { IQuotePrivate } from "./IQuotePrivate.interface";

export interface IQuotesPrivate {
	page: number,
	perPage: number,
	total: number,
	data: Array<IQuotePrivate>
}