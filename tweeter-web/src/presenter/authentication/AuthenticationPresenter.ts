import { NavigateOptions, To } from "react-router-dom";
import { AuthenticationService } from "../../model.service/AuthenticationService";

export interface AuthenticationView {
  originalUrl?: string;
  setIsLoading: (value: boolean) => void;
  navigate: (to: To, options?: NavigateOptions) => void | Promise<void>; 
  // ^ func signature for the func returned by React Router's useNavigate()
  displayErrorMessage: (message: string) => void;
}

export class AuthenticationPresenter {
  private _view: AuthenticationView;
  private _service: AuthenticationService = new AuthenticationService();

  private _rememberMe: boolean = false;

  protected constructor(view: AuthenticationView) {
    this._view = view;
  }

  public get rememberMe(): boolean { return this._rememberMe; }

  public set rememberMe(value: boolean) { this._rememberMe = value; }

  protected get view()       { return this._view; }
  protected get service()    { return this._service; }

}