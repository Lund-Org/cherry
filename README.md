### :warning: WORK IN PROGRESS :warning:

# Cherry

Cherry is a lightweight framework to quickly generate a web server

## Installation

Use the package manager [npm](http://npmjs.com) to install Cherry.

```bash
npm install @lund-org/cherry
```

## Usage

Checkout the example in the static folder.
To use the https mode, you need to generate the ssl keys, you can use this command in the config folder :
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=FR/ST=./L=./O=./OU=./CN=."
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/Lund-Org/cherry/blob/master/LICENSE)
