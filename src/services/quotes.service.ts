import { IQuotesPublic } from "interfaces/IQuotesPublics.interface";
import { ApiService } from "./api.service";

export class QuoteService {
	public static async getQuotes(perPage: number, page: number): Promise<IQuotesPublic> {
		try {
			return await ApiService.get(`/quotes?perPage=${perPage}&page=${page}`).then((res: any) => res);
		} catch (error) {
			throw new Error("Error while fetching quotes: " + error);
		}
	}
}