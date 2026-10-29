import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import { AuthToken, FakeData, Status } from "tweeter-shared";
import StatusItemScroller from "./components/mainLayout/StatusItemScroller";
import { useUserInfo } from "./components/userInfo/UserInfoHooks";
import { UserItemView } from "./presenter/UserItemPresenter";
import { FolloweePresenter } from "./presenter/FolloweePresenter";
import { FollowerPresenter } from "./presenter/FollowerPresenter";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  const { displayedUser } = useUserInfo();

  const loadMoreFeedItems = async (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> => {
    // Future milestone: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  };

  const loadMoreStoryItems = async (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> => {
    // Future milestone: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  };  

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to={`/feed/${displayedUser!.alias}`} />} />
        <Route 
          key={`feed-${displayedUser!.alias}`}
          path="feed/:displayedUser" 
          element={<StatusItemScroller
            itemDescription="feed"
            featurePath="/feed"
            loadMore={loadMoreFeedItems}
            />} 
            />
        <Route 
          key={`story-${displayedUser!.alias}`}
          path="story/:displayedUser" 
          element={<StatusItemScroller 
            itemDescription="story"
            featurePath="/story"
            loadMore={loadMoreStoryItems}
          />} 
        />
        <Route 
          path="followees/:displayedUser" 
          element={
            <UserItemScroller
              key={`followees-${displayedUser!.alias}`}
              featurePath="/followees"
              presenterFactory={(view: UserItemView) => new FolloweePresenter(view)}
            />
          } 
        />
        <Route 
          path="followers/:displayedUser"
          element={
            <UserItemScroller
              key={`followers-${displayedUser!.alias}`}
              featurePath="/followers"
              presenterFactory={(view: UserItemView) => new FollowerPresenter(view) }
            />
          } 
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={`/feed/${displayedUser!.alias}`} />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
