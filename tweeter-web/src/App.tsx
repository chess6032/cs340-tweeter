import "./App.css";
import { useContext } from "react";
import { UserInfoContext } from "./components/userInfo/UserInfoContexts";
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
import FeedScroller from "./components/mainLayout/FeedScroller";
import StoryScroller from "./components/mainLayout/StoryScroller";
import UserItemScroller from "./components/mainLayout/UserItem";
import { AuthToken, FakeData, User } from "tweeter-shared";

const App = () => {
  const { currentUser, authToken } = useContext(UserInfoContext);

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
  const { displayedUser } = useContext(UserInfoContext);

  // NOTE: some code duplication exists between loadMoreFollowees()
  // and loadMoreFollowers(), but that's only temporary while we 
  // use dummy data.

  const loadMoreFollowees = async (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);
  };

  const loadMoreFollowers = async (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);
  };

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to={`/feed/${displayedUser!.alias}`} />} />
        <Route path="feed/:displayedUser" element={<FeedScroller />} />
        <Route path="story/:displayedUser" element={<StoryScroller />} />
        <Route path="followees/:displayedUser" element={<UserItemScroller itemDescription="followees" featurePath="/followees" loadMore={loadMoreFollowees} />} />
        <Route path="followers/:displayedUser" element={<UserItemScroller itemDescription="followers" featurePath="/followers" loadMore={loadMoreFollowers} />} />
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
