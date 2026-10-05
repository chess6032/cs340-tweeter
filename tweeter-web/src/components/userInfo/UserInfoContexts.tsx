import { Context, createContext } from "react";
import { User, AuthToken } from "tweeter-shared";
import { UserInfo } from "./UserInfo";

// FIXME: replace instances of this with userInfo() hook
export const UserInfoContext = createContext<UserInfo>({} as UserInfo);

interface UserInfoActions {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void,
  clearUserInfo: () => void,
  setDisplayedUser: (user: User) => void,
}

const defaultUserInfoActions: UserInfoActions = {
  updateUserInfo: () => null,
  clearUserInfo: () => null,
  setDisplayedUser: () => null,
}

// FIXME: replace instance of this with userInfoActions() hook
export const UserInfoActionsContext: Context<UserInfoActions> =
  createContext<UserInfoActions>(defaultUserInfoActions);