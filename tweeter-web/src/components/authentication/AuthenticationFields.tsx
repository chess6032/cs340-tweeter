interface Props {
  onKeyDownCallback: (event: React.KeyboardEvent<HTMLElement>) => void
  // ^ or maybe refactor out Login/Register's loginOnEnter() and registerOnEnter() ? idk.
}

const AuthenticationFields = (props: Props) => {
  return (
    <span>stub</span>
  );
}

export default AuthenticationFields;