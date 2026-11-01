import { AuthToken } from "tweeter-shared";
import FollowService from "../../model.service/FollowService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

export const PAGE_SIZE = 10;

export class FolloweePresenter extends UserItemPresenter {
  private service: FollowService = new FollowService();

  public constructor(view: UserItemView) {
    super(view);
  }

  // NOTE: the code duplication between this and FollowerPresenter will be 
  // removed in M2B.
  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    try {
      const [newItems, hasMore] = await this.service.loadMoreFollowees(
        authToken,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );

      this.hasMoreItems = hasMore;
      this.lastItem = newItems.length > 0
        ? newItems[newItems.length - 1]
        : null;
      this.view.addItems(newItems);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load followees because of exception: ${error}`,
      );
    }
  };

}