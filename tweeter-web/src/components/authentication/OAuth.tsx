import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { useMessageActions } from "../toaster/MessageHooks";

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
  const { displayInfoMessage } = useMessageActions();

  const displayInfoMessageWithDarkBackground = (message: string): void => {
    displayInfoMessage(
      message,
      3000,
      "text-white bg-primary"
    );
  };

  const oAuthButtonParams: Array<[IconName, string]> = [
    ['google', 'Google'],
    ['facebook', 'Facebook'],
    ['twitter', 'Twitter'],
    ['linkedin', 'LinkedIn'],
    ['github', 'Github']
  ]

  return (
    <div className="text-center mb-3">
      {oAuthButtonParams.map((params) => (
        <OAuthButton
          platform={params[0]}
          platformDisplay={params[1]}
          displayInfoMessage={displayInfoMessageWithDarkBackground}
        />
      ))}
    </div>
  );
}

export default OAuth;