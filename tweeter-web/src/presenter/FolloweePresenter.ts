import FollowService from "../model.service/FollowService";

// Presenter/Observer pattern
export interface FolloweeView {

}

export class FolloweePresenter {
  private service: FollowService;
  private view: FolloweeView;

  public constructor(view: FolloweeView) {
    this.service = new FollowService();
    this.view = view;
  }
}