# TODO

## Milestone 2

Refactor **every functionality that contacts the server** to use MVP. In total, there are **14** such functionalities: the 12 that use `FakeData`, and then `PostStatus` and `Logout` as well. View layer (React components/hooks) should only contain code that directly interacts with the user (display output/receiving input).

> [!NOTE]
> A presenter's view interface is how it *updates* its view (per observer pattern). 
> 
> Ask: *Is a presenter pushing this out, or pulling it in?* Pushing out goes in the interface. Pulling in goes in a parameter in a function, or the presenter's constructor (if it's something that never changes).

### TODO

Functionalities to refactor:

- Uses `FakeData`:
  - [X] `App`
    - [X] `loadMoreFollowers()` (done in demo video)
    - [X] `loadMoreFollowees()` (done in demo video)
    - [X] `loadMoreFeedItems()`
    - [X] `loadMoreStoryItems()`
  - [X] `Login`
    - [X] `login()`
  - [X] `Register`
    - [X] `register()`
  - [X] `StatusItemScroller`
    - [X] `getUser()`
  - [ ] `UserInfoComponent`
    - [ ] `getIsFollowerStatus()`
    - [ ] `getFolloweeCount()`
    - [ ] `getFollowerCount()`
  - [X] `UserNavigationHook` (I think?)
    - [X] `getUser()`
- Others:
  - [ ] `PostStatus`
    - [ ] `submitPost()` (maybe???)
    - [ ] `postStatus()` (maybe???)
  - [ ] `Logout`
    - This one was explicitly mentioned in the spec but I don't appear to have a Logout component/class...????
  - [X] `Register`
    - [X] Image manipulation shih

Crossing my fingers I'll end up with 12 presenter classes... otherwise I'll have to ignore Douglas Adams advice and start panicking.

### Steps for converting to MVP

1. Create an app logic layer ("service").
    - Cache data, implement algorithms, etc.&mdash;anything needed to realize the program's **non-UI functionality**.
    - **Group related requests into the same service class**. In this program, there are 14 different kinds of requests the client sends to the server, but that does *not* mean you should make 14 different service classes.
2. Create a Presenter layer.
    - For the app's major components, and in some cases its hooks.
    - **One presenter for each component/hook that accesses dummy data or has other non-UI logic.**
      - e.g.:
        - user input *validation* logic
        - page management logic
        - code calling service classes
        - converting an image to a byte string
        - password validation
    - **Each presenter class should define a view interface** that is used by its component/hook. 
      - This is the method through which the presenter will call its view. Hence, the view should have methods for passing data to the view for display, displaying messages to the viewer, enabling/disabling UI controls, etc.
    - The more logic moved into the presenters the better, because presenter code is easier to test than view code.
    - **Presenters should never interact directly with the user.** Should a presenter need to display a message to otherweise change the UI, it should do so through its view using the **observer pattern**.
    - **All visual UI logic should go in the view layer, and all non-visual UI logic should go in the presenter layer.**

> [!TIP]
> You should end with at least **12 presenter classes**.

## Milestone 1

### Part 1

1. Remove code duplication between `StoryScroller.tsx` and `FeedScroller.tsx`.
    - [X] Create `StatusItem` component.
    - [X] Refactor `StoryScroller` and `FeedScroller` to use `StatusItem`.
2. Remove code duplication between `Login.tsx` and `Register.tsx`'s field factories.
    - [X] Create `AuthenticationFields` component.
    - [X] Refactor `Login` and `Register`'s field factories to use `AuthenticationFields`.
3. Refactor `AuthenticationFormLayout.tsx`: Move OAuth button logic into a separate component.
    - [X] Create `OAuth` component.
    - [X] Refactor `AuthenticationFormLayout` to use `OAuth`.

### Part 2

- [X] Create `StatusItemScroller` component (to replace `FeedScroller` and `StoryScroller`).
- [X] Refactor `App` to use `StatusItemScroller`.
- [X] Delete `FeedScroller` and `StoryScroller`.

### Part 3

1. [X] replace all instances of `displayToast()` with a func from the `useMessageActions()` hook.
    - `displayToast(ToastType.Info)`: replace with `displayInfoMessage()`.
    - `displayToast(ToastType.Error)`: replace with `displayErrorMessage()`.
    - NOTE: You won't be able to remove `displayToast()` instances in `MessageHooks.ts`, `ToastContext.ts`, nor `ToastInfoProvider.tsx`. Don't worry about these.
2. Hide `userInfoContext` and `userInfoActionContext` behind `useUserInfo()`/`useUserInfoAction()` hooks.
    - [X] create `useUserInfo()` and `useUserInfoAction()` hooks.
        - (You don't have to change the parameters used, so these hooks will be one-liners, like the `useMessageList()` hook showed in the video.)
    - [X] replace all instances of `userInfoContext` and `userInfoActionContext` with `useUserInfo()` and `useUserInfoAction()` respectively.
3. Remove duplicated `navigateToUser()` functions by replacing them with `useUserNavigation()` hook.
    - [X] Move the logic for `navigateToUser()` and the function it calls into a new `useUserNavigation()` hook. (The hook returns `navigateToUser()`.)
        - You must find a way to let users of this hook modify the `featurePath` it uses. You can do this by either:
            - (1) Adding another parameter to the hook, so that it takes in an event *and* a string (featurePath).
                - *(I opted for this one)*
            - (2) When the event is converted to a string (`event.target.toString()`), it *is* the URL. So you could use RegEx to extract the featurePath out of that.
    - [X] Replace instances of `navigateToUser()` with the hook.
