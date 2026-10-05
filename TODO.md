# TODO

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
    - [ ] Replace instances of `navigateToUser()` with the hook.
