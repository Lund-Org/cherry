# 🍒 Cherry

[![Build Status](https://travis-ci.com/Lund-Org/cherry.svg?branch=master)](https://travis-ci.com/Lund-Org/cherry)
[![Maintainability](https://api.codeclimate.com/v1/badges/9a31be9be174ebcbd59f/maintainability)](https://codeclimate.com/github/Lund-Org/cherry/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/9a31be9be174ebcbd59f/test_coverage)](https://codeclimate.com/github/Lund-Org/cherry/test_coverage)

Cherry is a lightweight framework to quickly generate a web server

## :electric_plug: Installation

Use the package manager [npm](http://npmjs.com) to install Cherry.

```bash
npm install @lund-org/cherry
```

## :wrench: Usage

Checkout the example in the [example folder](https://github.com/Lund-Org/cherry/tree/master/example).

*For the development* : To use the https mode, you need to generate the ssl keys, you can use this command in the config folder :
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=FR/ST=./L=./O=./OU=./CN=."
```
Warning : It doesn't work on Windows, you will only get the key.pem with this command. Let's find the way to do it on stackoverflow :joy:

---

### Hooks

[Example here](https://github.com/Lund-Org/cherry/tree/master/examples/03-hooks)

You can hook some events and retrieve informations. It is useful to add some code at specific moment of the workflow.

| Hook Name 	| Data sent	|
|------------	|---------	|
| beforeStartServer   | `{ cherry: <Cherry>, server: <CherryHTTPSServer or CherryHTTPServer> }` |
| afterStartServer    | `{ cherry: <Cherry>, server: <CherryHTTPSServer or CherryHTTPServer> }` |
| beforeStopServer    | `{ cherry: <Cherry>, server: <CherryHTTPSServer or CherryHTTPServer> }` |
| afterStopServer     | `{ cherry: <Cherry>, server: <CherryHTTPSServer or CherryHTTPServer> }` |
| beforeStartOrm      | `{ cherry: <Cherry>, orm: <The ORM plugin instance> }` |
| afterStartOrm       | `{ cherry: <Cherry>, orm: <The ORM plugin instance> }` |
| beforeStopOrm       | `{ cherry: <Cherry>, orm: <The ORM plugin instance> }` |
| afterStopOrm        | `{ cherry: <Cherry>, orm: <The ORM plugin instance> }` |
| beforeProcess       | `{ request: <CherryIncomingMessage>, response: <CherryServerResponse>, middlewares: <Array<Function>> }` |
| afterProcess        | `{ request: <CherryIncomingMessage>, response: <CherryServerResponse>, processResult: <The return value of the callback> }` |

---

### Route types

[Example here](https://github.com/Lund-Org/cherry/tree/master/examples/01-basic) [and here](https://github.com/Lund-Org/cherry/tree/master/examples/04-orm)

There is 2 types of route, the public folders to retrieve raw resources and the configured routes.

:warning: The public routes are always resolved at first

##### Public routes

| Route Name 	| Description	| Options	|
|------------	|---------	|---------	|
| PUBLIC_ROUTE_PUBLIC_FOLDER   | The folder where we will find a resource.<br /><br />It's an entrypoint, it means that if you request a route /my/route.html, if you have it as a configured route and the same path available in your public folder, it will retrieve the file in the public folder and then quit | **path** : The absolute path of the folder<br />**priority** (optionnal) : The priority of check |

##### Configured routes

| Route Name 	| Description	| Options	|
|------------	|---------	|---------	|
| ROUTE_CONTEXT   | A wrapper of routes which allows to avoid to set the same thing for a bunch of routes.<br /><br />For example, if you have an admin, you will have a middleware to check the authentication and the rights of the user. To not set it to every routes, you can put in on the ROUTE_CONTEXT and it will apply to subsequent routes | **type** : The type of route, here `ROUTE_CONTEXT`<br />**collection** : The array of subroutes<br />**name** (optionnal) : The name of the route which will be added before the name of the subroutes<br />**method** (optionnal) : The default HTTP method of the subroute, can be overriding<br />**path** (optionnal) : The leading path which will be added before the path of the subroutes<br />**middlewares** (optionnal) : The middlewares to execute for each subroutes<br />**rules** (optionnal) : The rules for route parameters if there is some in the path |
| ROUTE   | A configured route which will execute your code when requested | **type** : The type of route, here `ROUTE`<br />**path** : The path of the route<br />**callback** : The method to execute when the route is requested<br />**name** (optionnal) : The name of the route. It can be useful to detect it in a hook<br />**method** (optionnal) : The HTTP method of the route, it overrides the value set in the context (if present)<br />**middlewares** (optionnal) : The middlewares to execute before accessing to the callback<br />**rules** (optionnal) : The rules for route parameters if there is some in the path |



## :scroll: To do list

- [ ] [Debug mode (logger)](https://github.com/Lund-Org/cherry/issues/3)
- [ ] [Builtin helpers](https://github.com/Lund-Org/cherry/issues/5)
- [ ] [Enhance the release and deployment workflow](https://github.com/Lund-Org/cherry/issues/8)
- [ ] [Manage the form-data calls (+ file upload)](https://github.com/Lund-Org/cherry/issues/16)
- [ ] [Default 4xx - 5xx pages](https://github.com/Lund-Org/cherry/issues/17)
- [ ] [Manage optionnal parameters in the routes](https://github.com/Lund-Org/cherry/issues/18)
- [ ] [Manage redirections](https://github.com/Lund-Org/cherry/issues/19)

## :open_file_folder: Resources
#### View engine plugin
- [Cherry Handlebars connector](https://github.com/Lund-Org/cherry-handlebars-connector) : The plugin which uses [handlebars](https://handlebarsjs.com/) as the view engine
- [Cherry Pug connector](https://github.com/Lund-Org/cherry-pug-connector) : The plugin which uses [pug](https://pugjs.org/api/getting-started.html) as the view engine

#### ORM plugin
- [Cherry Typeorm connector](https://github.com/Lund-Org/cherry-typeorm-connector) : The plugin which uses [typeorm](https://typeorm.io/) as the database-orm engine
- [Cherry Sequelize connector](https://github.com/Lund-Org/cherry-sequelize-connector) : The plugin which uses [sequelize](http://docs.sequelizejs.com/) as the database-orm engine

## :computer: Applications using Cherry (as a real example)
- [Livedeck-server](https://github.com/Lund-Org/livedeck-server) : This project is the core of the livedeck project. It's the central point between the web/smartphone client and the software client. Like a bridge but with a database.


## :pencil2: Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## :book: License
[MIT](https://github.com/Lund-Org/cherry/blob/master/LICENSE)
