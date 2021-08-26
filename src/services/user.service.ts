import { IUser } from "interfaces/IUser.interface";
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
}
