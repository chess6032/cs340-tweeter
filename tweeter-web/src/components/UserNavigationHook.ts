import { useNavigate } from "react-router-dom";
import { AuthToken, User, FakeData } from "tweeter-shared";
import { useUserInfo, useUserInfoActions } from "./userInfo/UserInfoHooks";
import { useMessageActions } from "./toaster/MessageHooks";

const extractAlias = (value: string): string => {
  const index = value.indexOf("@");
  return value.substring(index);
};

const getUser = async (
  authToken: AuthToken,
  alias: string
): Promise<User | null> => {
  // TODO: Replace with the result of calling server
  return FakeData.instance.findUserByAlias(alias);
};

interface Props {
  featurePath: string
}

const useUserNavigation = (props: Props) => {
  // FIXME: should these be here, or moved out?
  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser, } = useUserInfoActions();

  /* navigateToUser() */
  return async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const toUser = await getUser(authToken!, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`${props.featurePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };
}

export default useUserNavigation;