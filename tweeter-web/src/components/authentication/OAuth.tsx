import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToastType } from "../toaster/Toast";
import { useContext } from "react";
import { ToastActionsContext } from "../toaster/ToastContexts";

interface ButtonProps {
  platform: IconName,
  platformTitle: string,
  displayInfoMessage: any
}

const OAuthButton = (props: ButtonProps) => {
  const { platform, platformTitle } = props;

  return (
    <button
      type="button"
      className="btn btn-link btn-floating mx-1"
      onClick={() =>
        props.displayInfoMessage(
          `${platformTitle} registration is not implemented.`
        )
      }
    >
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`${platform}Tooltip`}>{platformTitle}</Tooltip>}
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
        platformTitle={"Google"} 
        displayInfoMessage={displayInfoMessageWithDarkBackground} 
      />

      <button
        type="button"
        className="btn btn-link btn-floating mx-1"
        onClick={() =>
          displayInfoMessageWithDarkBackground(
            "Facebook registration is not implemented."
          )
        }
      >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="facebookTooltip">Facebook</Tooltip>}
        >
          <FontAwesomeIcon icon={["fab", "facebook"]} />
        </OverlayTrigger>
      </button>

      <button
        type="button"
        className="btn btn-link btn-floating mx-1"
        onClick={() =>
          displayInfoMessageWithDarkBackground(
            "Twitter registration is not implemented."
          )
        }
      >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="twitterTooltip">Twitter</Tooltip>}
        >
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </OverlayTrigger>
      </button>

      <button
        type="button"
        className="btn btn-link btn-floating mx-1"
        onClick={() =>
          displayInfoMessageWithDarkBackground(
            "LinkedIn registration is not implemented."
          )
        }
      >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="linkedInTooltip">LinkedIn</Tooltip>}
        >
          <FontAwesomeIcon icon={["fab", "linkedin"]} />
        </OverlayTrigger>
      </button>

      <button
        type="button"
        className="btn btn-link btn-floating mx-1"
        onClick={() =>
          displayInfoMessageWithDarkBackground(
            "Github registration is not implemented."
          )
        }
      >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="githubTooltip">GitHub</Tooltip>}
        >
          <FontAwesomeIcon icon={["fab", "github"]} />
        </OverlayTrigger>
      </button>
    </div>
  );
}

export default OAuth;