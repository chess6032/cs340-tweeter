import { AuthToken, User, FakeData } from "tweeter-shared";
import UserService from "../model.service/UserService";
import StatusService from "../model.service/StatusService";

export interface StoryView {}

export class StoryPresenter {
  private service: StatusService = new StatusService();
  private view: StoryView;
  private userService: UserService = new UserService();

  public constructor(view: StoryView) {
    this.view = view;
  }

  

  public async getUser (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    // Future milestone: Replace with the result of calling server
    return this.userService.getUser(authToken, alias);
  };
}