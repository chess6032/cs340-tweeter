import { AuthToken, User, FakeData } from "tweeter-shared";

export class UserInfoService {
  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User,
  ): Promise<boolean> {
    // FUTURE MILESTONE: Replace with the result of calling server
    return FakeData.instance.isFollower();
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User,
  ): Promise<number> {
    // FUTURE MILESTONE: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
  }

  public async getFollowerCount (
    authToken: AuthToken,
    user: User,
  ): Promise<number> {
    // Future milestone: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  }
}