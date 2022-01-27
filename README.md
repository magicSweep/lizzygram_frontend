# Frontend with gatsby, typescript, material-ui, redux.

- gatsby with material-ui - https://github.com/mui-org/material-ui/tree/HEAD/examples/gatsby

# Services

- photos: firestore, worker
- auth: firebase-auth, firestore
- tags: firestore

# TODO

- how to protect download url
- how to protect photo forms

# For production build

- Set real api urls
- In config.ts change expressUrl to heroku
- Number of photos per query

# Commands

- $ npm run start:fakeImports:true - change repositories from real to fake.
- $ npm run start:fakeImports:false - change repositories from fake to real.
- $ npm run start:create:func photos/Hello - create folder with react function component, test and stories files.
- $ npm run start:prepareToDeploy - first run start:fakeImports:false, then set expressUrl and number of photos per query
