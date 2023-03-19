# Opinionated React Template Generating Tool

## Prerequisite
The tool is written with an assumption of using React with `Typescript` and `sass` support.  
If your React package missing `Typescript` or `sass`, the template generated from this tool will NOT be compatible.

## Install
```shell
npm install -D @s247kim/react-tools
```
or install globally
```shell
npm install -g @s247kim/react-tools
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
