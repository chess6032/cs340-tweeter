import { AuthToken, Status, User } from "tweeter-shared";
import { PostStatusService } from "../model.service/PostStatusService";

export interface PostStatusView {
  setPost: (val: string) => void;
  setIsLoading: (val: boolean) => void;

  displayInfoMessage: (
      message: string,
      duration: number,
      bootstrapClasses?: string
    ) => string;
  displayErrorMessage: (
      message: string,
      bootstrapClasses?: string
    ) => string;
  deleteMessage: (messageId: string) => void;
}

export class PostStatusPresenter {
  private view: PostStatusView;
  private service: PostStatusService = new PostStatusService();

  public constructor(view: PostStatusView) {
    this.view = view;
  }

  public async postStatus (
    authToken: AuthToken,
    newStatus: Status,
  ): Promise<void> {
    this.service.postStatus(authToken, newStatus);
  }

  public async submitPost(
    authToken: AuthToken,
    currentUser: User,
    post: string
  ) {
    var postingStatusToastId = "";

    try {
      this.view.setIsLoading(true);
      postingStatusToastId = this.view.displayInfoMessage(
        "Posting status...",
        0,
      );

      const status = new Status(post, currentUser, Date.now());

      await this.postStatus(authToken, status);

      this.view.setPost("");
      this.view.displayInfoMessage("Status posted!", 2000);
    } catch (error) {
      this.view.displayErrorMessage(`Failed to post the status because of exception: ${error}`);
    } finally {
      this.view.deleteMessage(postingStatusToastId);
      this.view.setIsLoading(false);
    }
  }

  public clearPost() {
    this.view.setPost("");
  }
}