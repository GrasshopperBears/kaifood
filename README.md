# kaifood

To start project, you have to set configuration for client and server.
This project is using [`dotenv`](https://www.npmjs.com/package/dotenv) library for security.

## Client configuration

### `.env` configuration

Create `/client/.env` and add configuration.

```
BUILD_PATH='../server/dist'

REACT_APP_SERVER_URL=
REACT_APP_SERVER_SOCKET=
```

- `REACT_APP_SERVER_URL`: Server URL for API
- `REACT_APP_SERVER_SOCKET`: Server URL for websocket

### Firebase configuration

Create `/client/src/firebase-config.js` and add configuration

```js
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_AUTH_DOMAIN",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "FIREBASE_MESSAGEING_SENDER_ID",
  appId: "FIREBASE_APP_ID",
  measurementId: "FIREBASE_MEASERMENT_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
```

For more explanation, refer to the [document](https://firebase.google.com/docs/web/setup)


## Server configuration

### `.env` configuration

Create `/server/.env` and add configuration.

```
SSH_USER=
SSH_PASSWORD=
SSH_HOST=
SSH_PORT=

DB_HOST=
DB_PORT=
DB_STRING=
DB_NAME=

CLIENT_ADDR=
FILTER_APPROVED_RESTAURANT=false
```

This server is connecting MongoDB via SSH. You may change connection method by modifying `/server/models/index.js`.
- `SSH_USER`, `SSH_PASSWORD`, `SSH_HOST`, `SSH_PORT`: ssh configuration
- `DB_HOST`, `DB_PORT`, `DB_STRING`, `DB_NAME`: MongoDB configuration with respoect to server itself. Default value may be `127.0.0.1` for `DB_HOST` and `27017` for `DB_PORT`.
- `CLIENT_ADDR`: Deployed client address or `http://localhost:3000` for development
- `FILTER_APPROVED_RESTAURANT`: This configuration was for displaying only approved restaurant. However, approve system has not been implemented so setting this value as `true` will not show any restaurants in the service.
