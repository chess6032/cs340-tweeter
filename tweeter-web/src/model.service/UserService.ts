import { AuthToken, User, FakeData } from "tweeter-shared";

export default class UserService {
  public async getUser (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };
}