import { AuthToken, User, Status } from "tweeter-shared";
import UserService from "../model.service/UserService";
import StatusService from "../model.service/StatusService";

export interface StatusItemView {
  addItems: (items: Status[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class StatusItemPresenter {
  private _view: StatusItemView;
  private userService: UserService = new UserService();

  private _hasMoreItems: boolean = true;
  private _lastItem: Status | null = null;

  protected constructor(view: StatusItemView) {
    this._view = view;
  }

  public get hasMoreItems() { return this._hasMoreItems; }
  public get lastItem()     { return this._lastItem;     }
  public get view()         { return this._view;         }

  public set hasMoreItems(value: boolean)   { this._hasMoreItems = value; }
  public set lastItem(value: Status | null) { this._lastItem = value;     }

  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    // Future milestone: Replace with the result of calling server
    return this.userService.getUser(authToken, alias);
  };

  public reset() {
    this._lastItem = null;
    this._hasMoreItems = true;
  }

  public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;
}