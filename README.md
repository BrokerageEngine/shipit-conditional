# shipit-conditional

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Restrict certain tasks to certain servers** ✨

You may have situations where you only want to deploy to servers matching certain criteria. 
For example, you may have changed some aspect of how the web role works, but don’t want to trigger a deployment to your database servers.

originally inspired by [Capistrano](https://capistranorb.com/documentation/advanced-features/role-filtering/)

**** Currently this requires shipit-bastion as well ***

The methods needed in the ssh pool are part of ssh-proxy-pool. Currently that means you need to include shipit-bastion before this plugin to use it.

# Features

The server configuration in shipit will take an object.

```js
  servers: [
        {
          user: "be",
          host: "www.brokerageengine.com",
          roles: ["app", "db"]
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
```js
const isRole = ( role) =>  (connection) => connection.options &&
    connection.options.remote &&
    connection.options.remote.roles &&
    connection.options.remote.roles.includes(role)
  const isAppServer = isRole("app")
  const isDBServer = isRole("db")
   
  
 
  shipit.task("pwd",async  function() {
    //Gets pwd for all app servers
   const result = await shipit.remoteWithCondition(isAppServer, "pwd")
   //Gets the /tmp only for the db server
   const result2 = await shipit.remoteWithCondition(isDBServer, "ls -l /tmp")
  });
};
```
# License

MIT © 2019 Brokerage Engine, Inc
