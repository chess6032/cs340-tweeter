import { AuthToken, User } from "tweeter-shared";
import FollowService from "../model.service/FollowService";
import UserService from "../model.service/UserService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

export const PAGE_SIZE = 10;

export class FolloweePresenter extends UserItemPresenter {
  private service: FollowService = new FollowService();
  private userService: UserService = new UserService();
  private view: UserItemView;

  
  private hasMoreItems: boolean = true;
  private lastItem: User | null = null;

  public constructor(view: UserItemView) {
    this.view = view;
  }

  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    return this.userService.getUser(authToken, alias);
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    try {
      const [newItems, hasMore] = await this.service.loadMoreFollowees(
        authToken,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load followees because of exception: ${error}`,
      );
    }
  };

}