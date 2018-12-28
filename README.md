### :warning: WORK IN PROGRESS :warning:

# 🍒 Cherry

[![Build Status](https://travis-ci.com/Lund-Org/cherry.svg?branch=master)](https://travis-ci.com/Lund-Org/cherry)

Cherry is a lightweight framework to quickly generate a web server

## Installation

Use the package manager [npm](http://npmjs.com) to install Cherry.

```bash
npm install @lund-org/cherry
```

## Usage

Checkout the example in the [example folder](https://github.com/Lund-Org/cherry/tree/master/example).

*For the development* : To use the https mode, you need to generate the ssl keys, you can use this command in the config folder :
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=FR/ST=./L=./O=./OU=./CN=."
```
Warning : It doesn't work on Windows, you will only get the key.pem

## To do list

- [x] [Response management, including view (default), download and json (a builtin helper)](https://github.com/Lund-Org/cherry/issues/1)
- [x] [Templating management (a base for the plugins)](https://github.com/Lund-Org/cherry/issues/2)
- [ ] [Debug mode (logger)](https://github.com/Lund-Org/cherry/issues/3)
- [ ] [ORM integration](https://github.com/Lund-Org/cherry/issues/4)
- [ ] [Builtin helpers](https://github.com/Lund-Org/cherry/issues/5)
- [ ] [Hooks](https://github.com/Lund-Org/cherry/issues/6)
- [ ] [Plugin management](https://github.com/Lund-Org/cherry/issues/7)
- [ ] [Release and deployment workflow](https://github.com/Lund-Org/cherry/issues/8)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/Lund-Org/cherry/blob/master/LICENSE)
