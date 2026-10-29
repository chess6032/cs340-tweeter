# Notes

## M2A

TODO: add notes on *why* to move to a MVP model.


### Tips

- In the Follower/Followees pages, as you scroll you load more items onto the page and thus the scrollbar gets smaller (because the page gets larger). In these pages, **make sure that, when you select another user, the scrollbar resets to its original length**. When you click on a user, it must reload items for that user. If the scrollbar isn't resetting, then you're not actually loading the new users' items.
- Many of the functionality you need to move uses fake data, so look our for references to the `FakeData` class.
  - Every reference to `FakeData` is something that needs to be refactored, but not everything that needs to be refactored references `FakeData`.
    - (e.g., `PostStatus`'s `postStatus()` function doesn't reference fake data, but it needs to be refactored.)