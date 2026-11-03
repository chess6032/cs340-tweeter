import { useNavigate } from "react-router-dom";
import { AuthToken, User, FakeData } from "tweeter-shared";
import { useUserInfo, useUserInfoActions } from "./userInfo/UserInfoHooks";
import { useMessageActions } from "./toaster/MessageHooks";
import { UserNavigationPresenter, UserNavigationView } from "../presenter/UserNavigationPresenter";


const useUserNavigation = (featurePath: string) => {
  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser, } = useUserInfoActions();

  const listener: UserNavigationView = {};
  const presenter = new UserNavigationPresenter(listener);

  /* navigateToUser() */
  return async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = presenter.extractAlias(event.target.toString());

      const toUser = await presenter.getUser(authToken!, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`${featurePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };
}

export default useUserNavigation;