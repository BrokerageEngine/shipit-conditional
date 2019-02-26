# shipit-conditional

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Restrict certain tasks to certain servers** ✨

You may have situations where you only want to deploy to servers matching certain criteria. 
For example, you may have changed some aspect of how the web role works, but don’t want to trigger a deployment to your database servers.

originally inspired by [Capistrano](https://capistranorb.com/documentation/advanced-features/role-filtering/)

# Features

The server configuration in shipit will take an object.

```js
  servers: [
        {
          user: "be",
          host: "www.brokerageengine.com",
          appServer: true,
          dbServer: true
        }
      ]
```

By setting these flags you can define a method like following to be true if the server is a dbServer

```js
(connection) =>connection.dbServer === true
```

The plugin adds 

* shipit.remoteWithCondition
* shipit.remoteCopyWithCondition
* shipit.copyToRemoteWithCondition
* shipit.copyFromRemoteWithCondition 

Each of them takes a condition function as the first argument

```js
shipit.remoteWithCondition((condition => (connection.dbServer === true ), "pwd"))
```
```js
shipit.copyToRemoteWithCondition((condition => (connection.appServer === true ), "/tmp/local.txt", "/tmp/remote.txt"))
```

# License

MIT © 2019 Brokerage Engine, Inc
