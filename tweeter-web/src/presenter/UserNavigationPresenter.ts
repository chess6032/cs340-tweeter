import { AuthToken, User } from "tweeter-shared";
import UserService from "../model.service/UserService";

export interface UserNavigationView {}

export class UserNavigationPresenter {
  private service = new UserService();
  private view;

  public constructor(view: UserNavigationView) {
    this.view = view;
  }

  public async getUser (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    return this.service.getUser(authToken, alias);
  }

  public extractAlias (value: string): string {
    const index = value.indexOf("@");
    return value.substring(index);
  };
  
}