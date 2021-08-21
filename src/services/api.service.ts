import axios from "axios";

export class ApiService {
	public static async get(endpoint: string) {
		return new Promise((resolve, reject) => {
			axios
				.get(
					`${process.env.REACT_APP_API_URI}${endpoint}`
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
					`${process.env.REACT_APP_API_URI}${endpoint}`,
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
				.put(
					`${process.env.REACT_APP_API_URI}${endpoint}`,
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
					`${process.env.REACT_APP_API_URI}${endpoint}`,
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