interface Props {
  setAlias: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  onEnterCallback: () => Promise<void>,
  checkSubmittedButtonStatus: () => boolean
}

const AuthenticationFields = (props: Props) => {
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
          onChange={(event) => props.setAlias(event.target.value)}
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
          onChange={(event) => props.setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
}

export default AuthenticationFields;