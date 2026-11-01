import { User, AuthToken, FakeData } from "tweeter-shared";
import { useUserInfoActions } from "../components/userInfo/UserInfoHooks";

export class AuthenticationService {
  private _updateUserInfo = useUserInfoActions().updateUserInfo;

  public updateUserInfo(
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ): void {
    this._updateUserInfo(currentUser, displayedUser, authToken, remember);
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    // FUTURE MILESTONE: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, FakeData.instance.authToken];
  };


}