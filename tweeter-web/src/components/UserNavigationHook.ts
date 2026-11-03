import { useNavigate } from "react-router-dom";
import { AuthToken, User, FakeData } from "tweeter-shared";
import { useUserInfo, useUserInfoActions } from "./userInfo/UserInfoHooks";
import { useMessageActions } from "./toaster/MessageHooks";
import { UserNavigationPresenter, UserNavigationView } from "../presenter/UserNavigationPresenter";
import { useRef } from "react";


const useUserNavigation = (featurePath: string) => {
  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser, } = useUserInfoActions();

  const listener: UserNavigationView = {
    navigate,
    displayErrorMessage,
    setDisplayedUser
  };

  const presenterRef = useRef<UserNavigationPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new UserNavigationPresenter(
      listener, 
      featurePath
    );
  }

  /* navigateToUser() */
  return async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    const eventTarget = event.target.toString();
    return presenterRef.current!.navigateToUser(
      displayedUser!,
      authToken!,
      eventTarget
    );
  };
}

export default useUserNavigation;