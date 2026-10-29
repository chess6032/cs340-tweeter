// parent class for FolloweePresenter and FollowerPresenter

import { User } from "tweeter-shared";

export interface UserItemView {
  addItems: (items: User[]) => void;
  displayErrorMessage: (message: string) => void;
}

export class UserItemPresenter {

}