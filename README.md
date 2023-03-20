# Opinionated React Template Generating Tool

## Prerequisite
The tool is written with an assumption of using React with `Typescript` and `sass` support.  
If your React package missing `Typescript` or `sass`, the template generated from this tool will NOT be compatible.

## Install
```shell
npm install -g @s247kim/react-tools
```
> new command named `react-tools` registered globally.

or install locally
```shell
npm install -D @s247kim/react-tools
```
> NOTE: If it is installed locally, the script is placed in the bin within `node_modules`.  
> Register it as a `scripts` in `pacakge.json` file to use it 
```shell
# e.g. if `{"tools": "react-tools"}` is added to `scripts` section in the `package.json`  
npm run tools
```
or use it without installation
```shell
npx @s247kim/react-tools
```

## Usages
### Generate Component
The component name can be a camel case, pascal case, or separated by a space, hypen or underscore.
```shell
react-tools gen-comp "[component name]"
```
Generating shared component example
```shell
react-tools gen-comp -s "[component name]"
```

### Generate Context
The context name can be a camel case, pascal case, or separated by a space, hypen or underscore.
```shell
react-tools gen-context "[context name]"
```
