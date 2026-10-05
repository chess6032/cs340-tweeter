import { useContext } from "react";
import { ToastActionsContext } from "./ToastContexts";
import { ToastType } from "./Toast";

interface MessageActions {
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string,
  ) => string,
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string,
  ) => string,
  deleteMessage: (messageId: string) => void,
  deleteAllMessages: () => void,
}

const useMessageActions = (): MessageActions => {
  const { displayToast, deleteToast, deleteAllToasts } = useContext(ToastActionsContext);
  return {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => displayToast(
      ToastType.Info,
      message,
      duration,
      undefined, /* Use default title ("Info") */
      bootstrapClasses
    ),
    displayErrorMessage: (message: string, bootstrapClasses?: string) => displayToast(
      ToastType.Error,
      message,
      0, /* No cooldown on error message. It stays displayed until user closes it. */
      undefined, /* Use default title ("Info"). */
      bootstrapClasses
    ),
    deleteMessage: deleteToast,
    deleteAllMessages: deleteAllToasts
  };
}


export { useMessageActions };