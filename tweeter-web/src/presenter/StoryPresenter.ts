import { AuthToken, User, Status } from "tweeter-shared";
import UserService from "../model.service/UserService";
import StatusService from "../model.service/StatusService";

export const PAGE_SIZE = 10;

export interface StoryView {
  addItems: (items: Status[]) => void;
  displayErrorMessage: (message: string) => void;
}

export class StoryPresenter {
  private service: StatusService = new StatusService();
  private view: StoryView;
  private userService: UserService = new UserService();

  private _hasMoreItems: boolean = true;
  private _lastItem: Status | null = null;

  public constructor(view: StoryView) {
    this.view = view;
  }

  public get hasMoreItems() {
    return this._hasMoreItems;
  }

  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    // Future milestone: Replace with the result of calling server
    return this.userService.getUser(authToken, alias);
  };

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    try {
      const [newItems, hasMore] = await this.service.loadMoreStories(
        authToken,
        userAlias,
        PAGE_SIZE,
        this._lastItem
      );

      this._hasMoreItems = hasMore;
      this._lastItem = newItems.length > 0
        ? newItems[newItems.length - 1]
        : null;
      this.view.addItems(newItems);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load story items because of exception: ${error}`,
      );
    }
  };

  public reset() {
    this._lastItem = null;
    this._hasMoreItems = true;
  }
}