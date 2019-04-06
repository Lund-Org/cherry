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
Warning : It doesn't work on Windows, you will only get the key.pem

## :scroll: To do list

- [x] **[Top Priority : Manage the assets (route which match a public/asset folder)](https://github.com/Lund-Org/cherry/issues/10)**
- [x] [Response management, including view (default), download and json (a builtin helper)](https://github.com/Lund-Org/cherry/issues/1)
- [x] [Templating management (a base for the plugins)](https://github.com/Lund-Org/cherry/issues/2)
- [ ] [Debug mode (logger)](https://github.com/Lund-Org/cherry/issues/3)
- [x] [ORM integration](https://github.com/Lund-Org/cherry/issues/4)
- [ ] [Builtin helpers](https://github.com/Lund-Org/cherry/issues/5)
- [x] [Hooks](https://github.com/Lund-Org/cherry/issues/6)
- [x] [Plugin management](https://github.com/Lund-Org/cherry/issues/7)
- [x] [Enhancement of the route format](https://github.com/Lund-Org/cherry/issues/12)
- [x] [Release and deployment workflow](https://github.com/Lund-Org/cherry/issues/8)

## :open_file_folder: Resources
- [Cherry Handlebars connector](https://github.com/Lund-Org/cherry-handlebars-connector) : The plugin which uses [handlebars](https://handlebarsjs.com/) as the view engine
- [Cherry Pug connector](https://github.com/Lund-Org/cherry-pug-connector) : The plugin which uses [pug](https://pugjs.org/api/getting-started.html) as the view engine

- [Cherry Typeorm connector](https://github.com/Lund-Org/cherry-typeorm-connector) : The plugin which uses [typeorm](https://typeorm.io/) as the database-orm engine
- [Cherry Sequelize connector](https://github.com/Lund-Org/cherry-sequelize-connector) : The plugin which uses [sequelize](http://docs.sequelizejs.com/) as the database-orm engine

## :pencil2: Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## :book: License
[MIT](https://github.com/Lund-Org/cherry/blob/master/LICENSE)
