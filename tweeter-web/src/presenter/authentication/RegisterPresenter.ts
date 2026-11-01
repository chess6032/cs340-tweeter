import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class RegisterPresenter extends AuthenticationPresenter {
  public constructor(view: AuthenticationView) {
    super(view);
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ) {
    try {
      this.isLoading = true;

      const [user, authToken] = await this.service.register(
        firstName,
        lastName,
        alias,
        password,
        userImageBytes,
        imageFileExtension
      );

      this.service.updateUserInfo(user, user, authToken, this.rememberMe);
      this.view.navigate(`/feed/${user.alias}`);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`,
      );
    } finally {
      this.isLoading = false;
    }
  };
}