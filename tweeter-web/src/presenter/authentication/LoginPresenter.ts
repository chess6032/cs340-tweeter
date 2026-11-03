import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter {
  private originalUrl: string | undefined;

  public constructor(view: AuthenticationView, originalUrl: string | undefined) {
    super(view);
    this.originalUrl = originalUrl;
  }

  public async login(alias: string, password: string) {
    try {
      this.view.setIsLoading(true);

      const [user, authToken] = await this.service.login(alias, password);

      this.service.updateUserInfo(user, user, authToken, this.rememberMe);

      if (this.originalUrl != null) {
        this.view.navigate(this.originalUrl);
      } else {
        this.view.navigate(`/feed/${user.alias}`);
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`,
      );
    } finally {
      this.view.setIsLoading(false);
    }
  }
}