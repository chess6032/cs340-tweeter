import "./Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChangeEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import { Buffer } from "buffer";
import AuthenticationFields from "../AuthenticationFields";
import { useMessageActions } from "../../toaster/MessageHooks";
import { AuthenticationView } from "../../../presenter/authentication/AuthenticationPresenter";
import { RegisterPresenter, RegisterView } from "../../../presenter/authentication/RegisterPresenter";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  // const [imageBytes, setImageBytes] = useState<Uint8Array>(new Uint8Array());
  const [imageUrl, setImageUrl] = useState<string>("");
  // const [imageFileExtension, setImageFileExtension] = useState<string>("");
  // const [rememberMe, setRememberMe] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();
  // const { updateUserInfo } = useUserInfoActions();

  const listener: RegisterView = {
    navigate,
    displayErrorMessage,
    setImageUrl
  }

  const presenterRef = useRef<RegisterPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new RegisterPresenter(listener);
  }

  const checkSubmitButtonStatus = (): boolean => {
    return (
      !firstName ||
      !lastName ||
      !alias ||
      !password ||
      !imageUrl ||
      !presenterRef.current!.imageFileExtension
    );
  };

  const doRegister = () => {
    presenterRef.current!.register(
      firstName,
      lastName,
      alias,
      password,
      // imageBytes,
      // imageFileExtension
    );
  }

  const registerOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !checkSubmitButtonStatus()) {
      doRegister();
    }
  };

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   handleImageFile(file);
  // };

  // const handleImageFile = (file: File | undefined) => {
  //   if (file) {
  //     setImageUrl(URL.createObjectURL(file));

  //     const reader = new FileReader();
  //     reader.onload = (event: ProgressEvent<FileReader>) => {
  //       const imageStringBase64 = event.target?.result as string;

  //       // Remove unnecessary file metadata from the start of the string.
  //       const imageStringBase64BufferContents =
  //         imageStringBase64.split("base64,")[1];

  //       const bytes: Uint8Array = Buffer.from(
  //         imageStringBase64BufferContents,
  //         "base64"
  //       );

  //       setImageBytes(bytes);
  //     };
  //     reader.readAsDataURL(file);

  //     // Set image file extension (and move to a separate method)
  //     const fileExtension = getFileExtension(file);
  //     if (fileExtension) {
  //       setImageFileExtension(fileExtension);
  //     }
  //   } else {
  //     setImageUrl("");
  //     setImageBytes(new Uint8Array());
  //   }
  // };

  // const getFileExtension = (file: File): string | undefined => {
  //   return file.name.split(".").pop();
  // };

  const inputFieldFactory = () => {
    return (
      <>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            size={50}
            id="firstNameInput"
            placeholder="First Name"
            onKeyDown={registerOnEnter}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label htmlFor="firstNameInput">First Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            size={50}
            id="lastNameInput"
            placeholder="Last Name"
            onKeyDown={registerOnEnter}
            onChange={(event) => setLastName(event.target.value)}
          />
          <label htmlFor="lastNameInput">Last Name</label>
        </div>
        <AuthenticationFields
          setAlias={setAlias}
          setPassword={setPassword}
          onKeyDownCallback={registerOnEnter}
        />
        <div className="form-floating mb-3">
          <input
            type="file"
            className="d-inline-block py-5 px-4 form-control bottom"
            id="imageFileInput"
            onKeyDown={registerOnEnter}
            onChange={(event) => presenterRef.current!.handleFileChange(event)}
          />
          {imageUrl.length > 0 && (
            <>
              <label htmlFor="imageFileInput">User Image</label>
              <img src={imageUrl} className="img-thumbnail" alt=""></img>
            </>
          )}
        </div>
      </>
    );
  };

  const switchAuthenticationMethodFactory = () => {
    return (
      <div className="mb-3">
        Algready registered? <Link to="/login">Sign in</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Register"
      submitButtonLabel="Register"
      oAuthHeading="Register with:"
      inputFieldFactory={inputFieldFactory}
      switchAuthenticationMethodFactory={switchAuthenticationMethodFactory}
      setRememberMe={(value: boolean) => { presenterRef.current!.rememberMe = value; }}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={presenterRef.current!.isLoading}
      submit={doRegister}
    />
  );
};

export default Register;
