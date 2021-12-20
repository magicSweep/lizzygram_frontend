# Auth mechanism description.

## Subscribe:

- Auth subscribe - place where we set user info to our state.

## Login:

- We send login request to firebase. On success firebase triggers user change on subscribe

## Is editor:

- Have user add/edit photos priveleges? When subscription triggers with auth user.
- First time we send request to know about isEditor, and when we get response we save our user info to local storage(name, emali, isEditor). Next time we get isEditor from our local storage.
- On logout we remove local storage info
