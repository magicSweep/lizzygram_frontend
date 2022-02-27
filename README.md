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
- Off bundle analyze plugin

- PUSH TO GITHUB ONLY PREPARE FOR DEPLOY VERSION

# Commands

- $ npm run app:fake-imports - change imports for api from real to fake.
- $ npm run app:real-imports - change imports for api from fake to real.
- $ npm run start:create:func photos/Hello - create folder with react function component, test and stories files.
- $ npm run app:prepare-to-deploy - change imports and configs for deploy
- $ npm run app:prepare-to-develop - change imports and configs for develop
