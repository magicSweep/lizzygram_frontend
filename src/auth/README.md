# Auth - how it works.

- on init we check if exists saved to local storage user:
  - if yes - we set him to our init state
  - if not - we set uset to null and loading to true
- then on useAuthSubscribe we get info about user
  - if in state user exists we compare him with user from auth subscribe
  - if user null - we set user and if user.isEditor === undefined send additional request to check.

!!!We save user to local storage only after check isEditor, it means user field isEditor can not be undefined
