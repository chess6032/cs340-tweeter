import { User, AuthToken, FakeData } from "tweeter-shared";
import { useUserInfoActions } from "../components/userInfo/UserInfoHooks";
import { Buffer } from "buffer";

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

  public async register (
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // Future milestone: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, FakeData.instance.authToken];
  };


}