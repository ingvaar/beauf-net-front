import { IQuotePublic } from "./IQuotePublic.interface";

export interface IQuotesPublic {
	page: number,
	perPage: number,
	total: number,
	data: Array<IQuotePublic>
}