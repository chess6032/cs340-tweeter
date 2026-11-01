import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter {

  public constructor(view: AuthenticationView) {
    super(view);
  }

  public async login(alias: string, password: string) {
    try {
      this.isLoading = true;

      const [user, authToken] = await this.service.login(alias, password);

      this.service.updateUserInfo(user, user, authToken, this.rememberMe);

      if (!!this.view.originalUrl) {
        this.view.navigate(this.view.originalUrl);
      } else {
        this.view.navigate(`/feed/${user.alias}`);
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`,
      );
    } finally {
      this.isLoading = false;
    }
  };
}