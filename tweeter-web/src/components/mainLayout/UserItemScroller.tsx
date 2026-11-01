import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuthToken, User } from "tweeter-shared";
import { useParams } from "react-router-dom";
import UserItem from "../userItem/UserItem";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import { UserItemPresenter, UserItemView } from "../../presenter/UserItemPresenter";

interface Props {
  featurePath: string;
  presenterFactory: (listener: UserItemView) => UserItemPresenter;
}

const UserItemScroller = (props: Props) => {
  const { displayErrorMessage } = useMessageActions();
  const [items, setItems] = useState<User[]>([]);

  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();
  const { displayedUser: displayedUserAliasParam } = useParams();

  const listener: UserItemView = { // observer: listens for changes in the presenter
    addItems: (newItems: User[]) => 
      setItems((previousItems) => [...previousItems, ...newItems]),
    displayErrorMessage
  }

  const presenterRef = useRef<UserItemPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = props.presenterFactory(listener);
  }
  // Whatever's inside the parameters for useRef() is evaluated each time the hook 
  // is invoked---that is, whenever the component re-renders. Hence, if we were to pass in
  // a call to `props.presenterFactory()` into useRef(), that factory would be invoked each 
  // re-render---even though its return would be thrown out.
  // TL;DR: Passing in `null` is an optimization. We'd get the same result if we passed
  // `props.presenterFactory()` into useRef(), but that wouldn't be as efficient.

  const getUser = async (authToken: AuthToken, alias: string): Promise<User | null> => 
    presenter.getUser(authToken, alias);

  const loadMoreItems = async () => {
    presenter.loadMoreItems(authToken!, displayedUserAliasParam!);
  }

  // Update the displayed user context variable whenever the displayedUser url parameter changes. This allows browser forward and back buttons to work correctly.
  useEffect(() => {
    if (
      authToken &&
      displayedUserAliasParam &&
      displayedUserAliasParam != displayedUser!.alias
    ) {
      getUser(authToken!, displayedUserAliasParam!).then((toUser) => {
        if (toUser) {
          setDisplayedUser(toUser);
        }
      });
    }
  }, [displayedUserAliasParam]);

  // Initialize the component whenever the displayed user changes
  // NOTE: executed whenever user clicks on a different user.
  useEffect(() => {
    reset();
    loadMoreItems(); // NOTE: loads with null `lastItem`, so it renders the first page.
  }, [displayedUser]);

  const reset = async () => {
    setItems(() => []);
    presenter.reset();

    // setLastItem(() => null);
    // setHasMoreItems(() => true);
  };

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <UserItem user={item} featurePath={`${props.featurePath}`} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default UserItemScroller;