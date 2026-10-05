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
    - [ ] Create `OAuth` component.
    - [ ] Refactor `AuthenticationFormLayout` to use `OAuth`.
