import { IUser } from "interfaces/IUser.interface";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";

export class UserService {
  public static getCurrentUserValueByKey(key: string): string | boolean {
    let user: any = window.localStorage.getItem("user");

    if (!user) {
      AuthService.logout();
    } else {
      user = JSON.parse(user);
    }

    if (user[key]) {
      return user[key];
    }
    throw new Error(`Valeur ${key} non trouvée pour cet utilisateur.`);
  }

  public static async fetchMe(): Promise<IUser> {
    try {
      return await ApiService.get(`/user`).then((res: any) => res);
    } catch (error) {
      throw new Error("Error during the fetching of your data.");
    }
  }
}
