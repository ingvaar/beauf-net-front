import { INewUserForm } from "src/interfaces/INewUserForm.interface";
import { IUser } from "src/interfaces/IUser.interface";
import { IUserPatch } from "src/interfaces/IUserPatch.interface";
import { IUserPrivate } from "src/interfaces/IUserPrivate.interface";
import { IUserPublic } from "src/interfaces/IUserPublic.interface";
import jwtDecode from "jwt-decode";
import { ApiService } from "./api.service";

export class UserService {
  public static async fetch(userID: string): Promise<IUser> {
    try {
      return await ApiService.get(`/users/${userID}`).then((res: any) => res);
    } catch (error) {
      throw new Error("Error during the fetching of your data.");
    }
  }

  public static async fetchMe(): Promise<IUser> {
    try {
      const user: {userID: string} = jwtDecode(window.localStorage.getItem("token") ?? "");
      return await ApiService.get(`/users/${user.userID}`).then((res: any) => res);
    } catch (error) {
      throw new Error("Error during the fetching of your data.");
    }
  }

  public static async add(newUser: INewUserForm): Promise<IUser> {
		try {
			const res: IUser = await ApiService
				.post("/users", newUser)
				.then((res: any) => res);
			return res
		} catch (error: any) {
				throw new Error(error.response.data.message);
		}
  }

  public static async confirm(token: string): Promise<IUserPublic> {
		try {
			const res: IUserPublic = await ApiService
				.post(`/users/confirm?token=${token}`)
				.then((res: any) => res);
			return res
		} catch (error: any) {
				throw new Error(error.response.data.message);
		}
  }

  public static async update(userID: string, user: IUserPatch): Promise<IUserPrivate> {
		try {
			const res: IUserPrivate = await ApiService
				.patch(`/users/${userID}`, user)
				.then((res: any) => res);
			return res
		} catch (error: any) {
				throw new Error(error.response.data.message);
		}
  }

  public static async resendMail(): Promise<IUserPublic> {
		try {
			const res: IUserPrivate = await ApiService
				.post(`/users/resend`, {})
				.then((res: any) => res);
			return res
		} catch (error: any) {
				throw new Error(error.response.data.message);
		}
  }
}
