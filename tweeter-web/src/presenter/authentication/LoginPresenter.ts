import { NavigateOptions, To } from "react-router-dom";
import { AuthenticationService } from "../../model.service/AuthenticationService";

export interface LoginView {
  originalUrl?: string;
  navigate: (to: To, options?: NavigateOptions) => void | Promise<void>; 
  // ^ func signature for the func returned by React Router's useNavigate()
  displayErrorMessage: (message: string) => void;
}

export class LoginPresenter {
  private view: LoginView;
  private service: AuthenticationService = new AuthenticationService();

  private _rememberMe: boolean = false;
  private _isLoading: boolean = false;

  public constructor(view: LoginView) {
    this.view = view;
  }

  public set rememberMe(value: boolean) {
    this._rememberMe = value;
  }

  public get isLoading() {
    return this._isLoading;
  }

  public async login(alias: string, password: string) {
    try {
      this._isLoading = true;

      const [user, authToken] = await this.service.login(alias, password);

      this.service.updateUserInfo(user, user, authToken, this._rememberMe);

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
      this._isLoading = false;
    }
  };
}