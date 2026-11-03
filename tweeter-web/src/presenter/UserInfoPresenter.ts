import { AuthToken, User } from "tweeter-shared";
import { UserInfoService } from "../model.service/UserInfoService";


export interface UserInfoView {}

export class UserInfoPresenter {
  private service: UserInfoService = new UserInfoService();
  private view: UserInfoView;

  public constructor(view: UserInfoView) {
    this.view = view;
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    return this.service.getIsFollowerStatus(authToken, user, selectedUser);
  }

  public async getFolloweeCount(authToken: AuthToken, user: User) {
    return this.service.getFolloweeCount(authToken, user);
  }

  public async getFollowerCount(authToken: AuthToken, user: User) {
    return this.service.getFollowerCount(authToken, user);
  }
}