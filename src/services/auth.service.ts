import { get } from "lodash";
import { ILoginForm } from "interfaces/ILoginForm.interface";
import { ILoginResponse } from "./interfaces/ILoginResponse.interface";
import { EAuthErrors } from "./enums/EAuthErros.enum";
import { IUser } from "interfaces/IUser.interface";
import { ApiService } from "./api.service";
import { UserService } from "./user.service";

export class AuthService {
	public static isEmptyForm = (form: ILoginForm): boolean => {
		let isFormEmpty: boolean = true;

		Object.keys(form).forEach((key: string) => {
			if (get(form, key).length > 0) {
				isFormEmpty = false;
			}
		});

		return isFormEmpty;
	};

	public static isFilledForm(
		form: ILoginForm,
		fieldsNumberExpected: number
	): boolean {
		let formFilledFields: number = 0;

		Object.keys(form).forEach((key: string) => {
			if (get(form, key).length > 0) {
				formFilledFields += 1;
			}
		});

		if (fieldsNumberExpected === formFilledFields) {
			return true;
		}
		return false;
	};

	private static isValidPassword(password: string): boolean {
		return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(.{8,})$/).test(password);
	};

	public static isValidLoginRegisterForm(loginForm: ILoginForm) {
		if (loginForm.identifier.length === 0 || loginForm.password.length === 0) {
			throw new Error("Please, fill all the fields.");
		}
		if (this.isValidPassword(loginForm.password) === false) {
			throw new Error("The password must be at least 8 characters long and contain 1 digit and 1 uppercase.");
		}
	};

	public static async login(loginForm: ILoginForm) {
		try {
			const res: ILoginResponse = await ApiService
				.post("/login", loginForm)
				.then((res: any) => res);

			window.localStorage.setItem("token", res.token);
		} catch (error) {
			const readableError: string | undefined = get(
				EAuthErrors,
				error.response.data.message
			);

			if (readableError) {
				throw new Error(readableError);
			} else {
				throw new Error("Error during the connection, please try again later.");
			}
		}
	};

	public static async isLogged(): Promise<boolean | IUser> {
		try {
			if (!window.localStorage.getItem("token")) {
				return false;
			}
			return await UserService.fetchMe();
		} catch (error) {
			window.localStorage.clear();
			throw new Error(error.message);
		}
	};

	public static logout(): void {
		window.localStorage.clear();
		window.location.pathname = "/login";
	};
}