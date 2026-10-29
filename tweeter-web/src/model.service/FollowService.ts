import { AuthToken, User, FakeData } from "tweeter-shared";

export default class FollowService {
  // NOTE: some code duplication exists between loadMoreFollowees()
  // and loadMoreFollowers(), but that's only temporary while we 
  // use dummy data.

  public async loadMoreFollowees (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);
   };

  public async loadMoreFollowers (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the re  sult of calling server
    return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);
  };
}