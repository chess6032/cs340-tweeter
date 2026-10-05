import { useContext } from "react"
import { UserInfoActionsContext, UserInfoContext } from "./UserInfoContexts"

const useUserInfo = () => {
  return useContext(UserInfoContext);
}

const useUserInfoActions = () => {
  return useContext(UserInfoActionsContext);
}

export { useUserInfo, useUserInfoActions };