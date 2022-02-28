# jsnow

![GitHub](https://img.shields.io/github/license/LeoDog896/jsnow?style=for-the-badge)
![GitHub Repo stars](https://img.shields.io/github/stars/LeoDog896/jsnow?style=for-the-badge)

A simple JavaScript / TypeScript evaulator. Outputs line by line output.

Site at: https://now.js.org

## How does it work?

Using babel plugins, a debug(lineNumber, expression) function is inserted whenever appropiate.

For example, `5 == 5` becomes `debug(1, 5 == 5)`

## Contributing

Feel free to submit a pull request or issue! Feedback is greately appreciated!