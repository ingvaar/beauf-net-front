import axios from "axios";

const BASE_URI = process.env.REACT_APP_API_URI;

export class ApiService {
	public static async get(endpoint: string) {
		return new Promise((resolve, reject) => {
			axios
				.get(
					`${BASE_URI}${endpoint}`
					, {
						headers: {
							Authorization: `Bearer ${window.localStorage.getItem(
								"token"
							)}`,
						},
					}
				)
				.then((res: any) => {
					resolve(res.data);
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	}

	public static async post(endpoint: string, query?: any) {
		return new Promise((resolve, reject) => {
			axios
				.post(
					`${BASE_URI}${endpoint}`,
					query,
					{
						headers: {
							Authorization: `Bearer ${window.localStorage.getItem(
								"token"
							)}`,
						},
					}
				)
				.then((res: any) => {
					resolve(res.data);
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	}

	public static async patch(endpoint: string, query: any) {
		return new Promise((resolve, reject) => {
			axios
				.patch(
					`${BASE_URI}${endpoint}`,
					query,
					{
						headers: {
							Authorization: `Bearer ${window.localStorage.getItem(
								"token"
							)}`,
						},
					}
				)
				.then((res: any) => {
					resolve(res.data);
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	}

	public static async delete(endpoint: string) {
		return new Promise((resolve, reject) => {
			axios
				.delete(
					`${BASE_URI}${endpoint}`,
					{
						headers: {
							Authorization: `Bearer ${window.localStorage.getItem(
								"token"
							)}`,
						},
					}
				)
				.then((res: any) => {
					resolve(res.data);
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	}
}