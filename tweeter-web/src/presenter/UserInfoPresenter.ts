import { AuthToken, User } from "tweeter-shared";
import { UserInfoService } from "../model.service/UserInfoService";


export interface UserInfoView {
  setIsFollower: (value: boolean) => void;
  setFolloweeCount: (value: number) => void;
  setFollowerCount: (value: number) => void;
  setIsLoading: (value: boolean) => void;

  displayErrorMessage: (message: string) => string;
  displayInfoMessage: (message: string, duration: number) => string;
  deleteMessage: (messageId: string) => void;
}

export class UserInfoPresenter {
  private service: UserInfoService = new UserInfoService();
  private view: UserInfoView;

  public constructor(view: UserInfoView) {
    this.view = view;
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    return this.service.getIsFollowerStatus(authToken, user, selectedUser);
  }

  public async getFolloweeCount(authToken: AuthToken, user: User) {
    return this.service.getFolloweeCount(authToken, user);
  }

  public async getFollowerCount(authToken: AuthToken, user: User) {
    return this.service.getFollowerCount(authToken, user);
  }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User,
  ) {
    try {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.getIsFollowerStatus(authToken!, currentUser!, displayedUser!),
        );
      }
    } catch (error) {
      this.view.displayErrorMessage(`Failed to determine follower status because of exception: ${error}`);
    }
  }

  public async setNumbFollowees(
    authToken: AuthToken,
    displayedUser: User,
  ) {
    try {
      this.view.setFolloweeCount(await this.getFolloweeCount(authToken, displayedUser));
    } catch (error) {
      this.view.displayErrorMessage(`Failed to get followees count because of exception: ${error}`);
    }
  }

  public async setNumbFollowers (
    authToken: AuthToken,
    displayedUser: User,
  ) {
    try {
      this.view.setFollowerCount(await this.getFollowerCount(authToken, displayedUser));
    } catch (error) {
      this.view.displayErrorMessage(`Failed to get followers count because of exception: ${error}`);
    }
  }

  public async followDisplayedUser(
    authToken: AuthToken,
    displayedUser: User
  ) {
    var followingUserToast: string = "";

    try {
      this.view.setIsLoading(true);
      followingUserToast = this.view.displayInfoMessage(
        `Following ${displayedUser.name}...`,
        0
      );

      const [followerCount, followeeCount] = await this.follow(
        authToken!,
        displayedUser!,
      );

      this.view.setIsFollower(true);
      this.view.setFollowerCount(followerCount);
      this.view.setFolloweeCount(followeeCount);
    } catch (error) {
      this.view.displayErrorMessage(`Failed to follow user because of exception: ${error}`);
    } finally {
      this.view.deleteMessage(followingUserToast);
      this.view.setIsLoading(false);
    }
  }
  
  public async follow(
    authToken: AuthToken,
    userToFollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // Future milestone: Call the server

    const followerCount = await this.getFollowerCount(authToken, userToFollow);
    const followeeCount = await this.getFolloweeCount(authToken, userToFollow);

    return [followerCount, followeeCount];
  };
}