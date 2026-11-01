import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import StatusItem from "../statusItem/StatusItem";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import { StatusItemPresenter, StatusItemView } from "../../presenter/StatusItemPresenter";

interface Props {
  featurePath: string;
  presenterFactory: (listener: StatusItemView) => StatusItemPresenter;
}

const StatusItemScroller = (props: Props) => {
  const { displayErrorMessage } = useMessageActions();
  const [items, setItems] = useState<Status[]>([]);

  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();
  const { displayedUser: displayedUserAliasParam } = useParams();

  const listener: StatusItemView = { // observer for updating this view
    addItems: (newItems: Status[]) =>
      setItems((previousItems) => [...previousItems, ...newItems]),
    displayErrorMessage
  }; 

  const presenter = props.presenterFactory(listener);

  // Update the displayed user context variable whenever the displayedUser url parameter changes. This allows browser forward and back buttons to work correctly.
  useEffect(() => {
    if (
      authToken &&
      displayedUserAliasParam &&
      displayedUserAliasParam != displayedUser!.alias
    ) {
      presenter.getUser(authToken!, displayedUserAliasParam!).then((toUser) => {
        if (toUser) {
          setDisplayedUser(toUser);
        }
      });
    }
  }, [displayedUserAliasParam]);

  // Initialize the component whenever the displayed user changes
  useEffect(() => {
    reset();
    loadMoreItems();
  }, [displayedUser]);

  const reset = async () => {
    setItems(() => []);
    presenter.reset();
  };

  const loadMoreItems = async () => {
    presenter.loadMoreItems(authToken!, displayedUserAliasParam!);
  }

  // const loadMoreItems = async (lastItem: Status | null) => {
  //   try {
  //     const [newItems, hasMore] = await props.loadMore(
  //       authToken!,
  //       displayedUser!.alias,
  //       PAGE_SIZE,
  //       lastItem
  //     );

  //     setHasMoreItems(() => hasMore);
  //     setLastItem(() => newItems[newItems.length - 1]);
  //     addItems(newItems);
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to load ${props.itemDescription} items because of exception: ${error}`,
  //     );
  //   }
  // };

  // const getUser = async (
  //   authToken: AuthToken,
  //   alias: string
  // ): Promise<User | null> => {
  //   // TODO: Replace with the result of calling server
  //   return FakeData.instance.findUserByAlias(alias);
  // };

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
            <StatusItem status={item} featurePath={props.featurePath}/>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default StatusItemScroller;