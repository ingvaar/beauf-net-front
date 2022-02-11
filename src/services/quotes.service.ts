import { INewQuoteForm } from "src/interfaces/INewQuoteForm.interface";
import { IQuotePublic } from "src/interfaces/IQuotePublic.interface";
import { IQuotesPublic } from "src/interfaces/IQuotesPublic.interface";
import { get } from "lodash";
import { ApiService } from "./api.service";
import { EQuotesErrors } from "./enums/EQuotesErrors.enum";

export class QuoteService {
	public static async getQuotes(perPage: number, page: number): Promise<IQuotesPublic> {
		try {
			return await ApiService.get(`/quotes?perPage=${perPage}&page=${page}`).then((res: any) => res);
		} catch (error: any) {
			throw new Error("Error while fetching quotes: " + error);
		}
	}

	public static async validateQuote(id: string) {
		try {
			return await ApiService.post(`/quotes/${id}/validate`).then((res: any) => res);
		} catch (error: any) {
			throw new Error("Error while validating quote: " + error);
		}
	}

	public static async unvalidateQuote(id: string) {
		try {
			return await ApiService.post(`/quotes/${id}/unvalidate`).then((res: any) => res);
		} catch (error: any) {
			throw new Error("Error while validating quote: " + error);
		}
	}

	public static async deleteQuote(id: string): Promise<IQuotePublic> {
		try {
			return await ApiService.delete(`/quotes/${id}`).then((res: any) => res);
		} catch (error: any) {
			throw new Error("Error while deleting quote: " + error);
		}
	}

	public static async getUnvalidatedQuotes(perPage: number, page: number) {
		try {
			return await ApiService.get(`/quotes/unvalidated?perPage=${perPage}&page=${page}`).then((res: any) => res);
		} catch (error: any) {
			throw new Error("Error while fetching unvalidated quotes: " + error);
		}
	}

	public static async postQuote(quoteForm: INewQuoteForm): Promise<IQuotePublic> {
		try {
			const res: IQuotePublic = await ApiService
				.post("/quotes", quoteForm)
				.then((res: any) => res);
			return res
		} catch (error: any) {
			const readableError: string | undefined = get(
				EQuotesErrors,
				error.response.data.message
			);

			if (readableError) {
				throw new Error(readableError);
			} else {
				throw new Error("Cannot create quote");
			}
		}
	}
}