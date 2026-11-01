import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import AuthenticationFields from "../AuthenticationFields";
import { useMessageActions } from "../../toaster/MessageHooks";
import { AuthenticationView } from "../../../presenter/authentication/AuthenticationPresenter";
import { LoginPresenter } from "../../../presenter/authentication/LoginPresenter";


interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();

  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };

  const listener: AuthenticationView = {
    originalUrl: props.originalUrl,
    setIsLoading,
    navigate,
    displayErrorMessage
  }

  // TODO: Do I need to make this a ref?
  const presenter: LoginPresenter = new LoginPresenter(listener);

  const doLogin = () => {
    presenter.login(alias, password);
  }

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.key == "Enter" && !checkSubmitButtonStatus()) {
      doLogin();
    }
  }

  const inputFieldFactory = () => {

    return (
      <>
        <AuthenticationFields
          setAlias={setAlias}
          setPassword={setPassword}
          onKeyDownCallback={loginOnEnter}
        />
      </>
    );
  };

  const switchAuthenticationMethodFactory = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldFactory={inputFieldFactory}
      switchAuthenticationMethodFactory={switchAuthenticationMethodFactory}
      setRememberMe={(value: boolean) => {presenter.rememberMe = value}}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={isLoading}
      submit={doLogin}
    />
  );
};

export default Login;
