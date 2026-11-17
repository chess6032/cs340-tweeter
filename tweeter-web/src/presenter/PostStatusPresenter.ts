import { AuthToken, Status, User } from "tweeter-shared";

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

  public constructor(view: PostStatusView) {
    this.view = view;
  }

  // TODO: move to service?
  public async postStatus (
    authToken: AuthToken,
    newStatus: Status,
  ): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // Future milestone: Call the server to post the status
  }

  // TODO: is there anything in here I should move to service?
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