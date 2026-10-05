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
- [ ] Delete `FeedScroller` and `StoryScroller`.
