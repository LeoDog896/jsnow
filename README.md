# jsnow <img src="./static/favicon.svg" height="60" align="right" alt="JSNow Logo">

[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)
![GitHub](https://img.shields.io/github/license/LeoDog896/jsnow)
![GitHub Repo stars](https://img.shields.io/github/stars/LeoDog896/jsnow)

A simple JavaScript / TypeScript evaulator. Outputs line by line output.

Site at: https://now.js.org

## How does it work?

Using babel plugins, a debug(lineNumber, expression) function is inserted whenever appropiate.

For example, `5 == 5` becomes `debug(1, 5 == 5)`

## Contributing

Feel free to submit a pull request or issue! Feedback is greately appreciated!

### Development

Run `yarn dev` to start automatically building the site.

### Building

Run `yarn build` to build the site. It will output to `build/`.

## License

[AGPLv3](./LICENSE)
