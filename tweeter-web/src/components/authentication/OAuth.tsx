import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToastType } from "../toaster/Toast";
import { useContext } from "react";
import { ToastActionsContext } from "../toaster/ToastContexts";

interface ButtonProps {
  platform: IconName,
  platformDisplay: string,
  displayInfoMessage: any
}

const OAuthButton = (props: ButtonProps) => {
  const { platform, platformDisplay } = props;

  return (
    <button
      type="button"
      className="btn btn-link btn-floating mx-1"
      onClick={() =>
        props.displayInfoMessage(
          `${platformDisplay} registration is not implemented.`
        )
      }
    >
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`${platform}Tooltip`}>{platformDisplay}</Tooltip>}
      >
        <FontAwesomeIcon icon={["fab", platform]} />
      </OverlayTrigger>
    </button>
  );
}

const OAuth = () => {
  const { displayToast } = useContext(ToastActionsContext);

  const displayInfoMessageWithDarkBackground = (message: string): void => {
    displayToast(
      ToastType.Info,
      message,
      3000,
      undefined,
      "text-white bg-primary"
    );
  };

  return (
    <div className="text-center mb-3">
      <OAuthButton 
        platform={"google"} 
        platformDisplay={"Google"} 
        displayInfoMessage={displayInfoMessageWithDarkBackground} 
      />

      <OAuthButton 
        platform={"facebook"} 
        platformDisplay={"Facebook"} 
        displayInfoMessage={displayInfoMessageWithDarkBackground} 
      />

      <OAuthButton 
        platform={"twitter"}
        platformDisplay={"Twitter"}
        displayInfoMessage={displayInfoMessageWithDarkBackground} 
      />

      <OAuthButton
        platform={"linkedin"}
        platformDisplay={"LinkedIn"}
        displayInfoMessage={displayInfoMessageWithDarkBackground} 
      />

      <OAuthButton 
        platform={"github"} 
        platformDisplay={"Github"} 
        displayInfoMessage={displayInfoMessageWithDarkBackground} 
      />
    </div>
  );
}

export default OAuth;