// parent class for FolloweePresenter and FollowerPresenter

import { User } from "tweeter-shared";

export interface UserItemView {
  addItems: (items: User[]) => void;
  displayErrorMessage: (message: string) => void;
}

export class UserItemPresenter {
  private _view: UserItemView;

  protected constructor(view: UserItemView) {
    this._view = view;
  }

  protected get view() {
    return this._view;
  }
}