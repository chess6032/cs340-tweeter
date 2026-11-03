import { AuthToken, User } from "tweeter-shared";
import UserService from "../model.service/UserService";
import { NavigateOptions, To } from "react-router-dom";

export interface UserNavigationView {
  navigate: (to: To, options?: NavigateOptions) => void | Promise<void>; 
  displayErrorMessage: (message: string) => void;
  setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter {
  private service = new UserService();
  private view: UserNavigationView;
  private featurePath: string;

  public constructor(
    view: UserNavigationView,
    featurePath: string
  ) {
    this.view = view;
    this.featurePath = featurePath;
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

  public async navigateToUser(
    displayedUser: User,
    authToken: AuthToken,
    eventTarget: string
  ) {
    try {
      const alias = this.extractAlias(eventTarget);

      const toUser = await this.getUser(authToken, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser)) {
          this.view.setDisplayedUser(toUser);
          this.view.navigate(`${this.featurePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      this.view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  }
  
}