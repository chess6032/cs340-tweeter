import { ChangeEvent } from "react";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";
import { Buffer } from "buffer";

export interface RegisterView extends AuthenticationView {
  setImageUrl: (newUrl: string) => void;
}

export class RegisterPresenter extends AuthenticationPresenter {
  private imageBytes: Uint8Array = new Uint8Array();
  private imageFileExtension: string = "";

  public constructor(view: RegisterView) {
    super(view);
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string
  ) {
    try {
      this.isLoading = true;

      const [user, authToken] = await this.service.register(
        firstName,
        lastName,
        alias,
        password,
        this.imageBytes,
        this.imageFileExtension
      );

      this.service.updateUserInfo(user, user, authToken, this.rememberMe);
      this.view.navigate(`/feed/${user.alias}`);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`,
      );
    } finally {
      this.isLoading = false;
    }
  };

  ////////////////// IMAGE LOGIC //////////////////
  
  public handleImageFile (file: File | undefined) {
    const view = this.view as RegisterView;
    if (file) {
      view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this.imageBytes = bytes;
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this.imageFileExtension = fileExtension;
      }
    } else {
      view.setImageUrl("");
      this.imageBytes = new Uint8Array();
    }
  };

  getFileExtension (file: File): string | undefined {
    return file.name.split(".").pop();
  };
}