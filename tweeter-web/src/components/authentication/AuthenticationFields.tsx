import { useState } from "react";

interface Props {
  onEnterCallback: () => Promise<void>,
  checkSubmittedButtonStatus: () => boolean
}

const AuthenticationFields = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  const generateOnKeyDownCallback = (callback: () => Promise<void>, checkSubmittedButtonStatus: () => boolean) =>
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key == "Enter" && !checkSubmittedButtonStatus()) {
        callback();
      }
    };

  const onKeyDownCallback = generateOnKeyDownCallback(props.onEnterCallback, props.checkSubmittedButtonStatus);

  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onKeyDown={onKeyDownCallback}
          onChange={(event) => setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control bottom"
          id="passwordInput"
          placeholder="Password"
          onKeyDown={onKeyDownCallback}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
}

export default AuthenticationFields;