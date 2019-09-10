# MaintenanceTracker

![Logo](https://github.com/sarahdrew/maintenancetracker-client/blob/master/smaller-logo.png)

### Link to [Live App](https://sarahs-maintenancetracker-client.now.sh/)

## Technology used 
React, CSS, Node, Express, PostgreSQL


## Summary
MaintenanceTracker is a fullstack application for tenants and landlords to communicate efficiently about maintenance requests. After registering for an account, tenants can make requests about maintenance issues in their building and landlords update the progress of the request.


## API

``` /api
.
├── /auth
│   └── POST
│       ├── /login
│       └── /refresh
├── /listings
│   └── GET /
│   |   └── /:request_id
│   └── POST
│       └── /:id
|   |__ PUT
│       └──/:id
├── /users
│   └── GET
│       └── /
│   └── POST
│       └── /
```

[Repo for Client](https://github.com/sarahdrew/maintenancetracker-client)
