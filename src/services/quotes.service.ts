import { INewQuoteForm } from "interfaces/INewQuoteForm.interface";
import { IQuotePublic } from "interfaces/IQuotePublic.interface";
import { IQuotesPublic } from "interfaces/IQuotesPublics.interface";
import { get } from "lodash";
import { ApiService } from "./api.service";
import { EQuotesErrors } from "./enums/EQuotesErros.enum";

export class QuoteService {
	public static async getQuotes(perPage: number, page: number): Promise<IQuotesPublic> {
		try {
			return await ApiService.get(`/quotes?perPage=${perPage}&page=${page}`).then((res: any) => res);
		} catch (error) {
			throw new Error("Error while fetching quotes: " + error);
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
	};
}