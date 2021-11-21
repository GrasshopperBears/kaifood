# kaifood

To start project, you have to set configuration for client and server.

## Client configuration

create `/client/.env` and add configuration.

```
BUILD_PATH='../server/dist'

REACT_APP_SERVER_URL=
REACT_APP_SERVER_SOCKET=
```

- `REACT_APP_SERVER_URL`: Server URL for API
- `REACT_APP_SERVER_SOCKET`: Server URL for websocket


## Server configuration

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
