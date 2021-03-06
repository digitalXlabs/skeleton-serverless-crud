#  Serverless CRUD (class) [![Build Status](https://travis-ci.org/digitalXlabs/skeleton-serverless-crud.png?branch=master)](https://travis-ci.org/digitalXlabs/skeleton-serverless-crud)

Drawing inspiration from [serverless-crud](https://github.com/pmuens/serverless-crud), this version uses a class instead of functions to provide a basic CRUD scaffold

## Installation
This works with Serverless v1.

1. From your terminal run `serverless install --url https://github.com/digitalXlabs/skeleton-serverless-crud` to install into the current working directory
2. cd into skeleton-serverless-crud directory
3. Run `npm install`
4. Deploy with `serverless deploy` to see it running

## AWS

The skeletion project users the folling resources
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB

### AWS Lambda
The project once deployed gives you five Lambda functions
1. create
2. readOne
3. readAll
4. update
5. delete

### AWS API Gateway

The project will create the api gateway endpoints for each of the 5 CRUD functions. Each endpoint is private and requires an API Key, which you can create in the API Gateway console.

### AWS DynamoDB
The project will create a DynamoDB table called `skeleton`. It has a primary key `uuid`

## JSON Schema

We've included a sample json schema for the project. This is used to demonstrate the validation of your input

## Tests

```sh
npm install
npm test
```

## Dependencies

- [json-schema-remote](https://github.com/entrecode/json-schema-remote): Node.js module to validate JSON objects against a JSON Schema, including remote references ($ref)
- [uuid](https://github.com/defunctzombie/node-uuid): Rigorous implementation of RFC4122 (v1 and v4) UUIDs.

## Dev Dependencies

- [aws-sdk](https://github.com/aws/aws-sdk-js): AWS SDK for JavaScript
- [ink-docstrap](https://github.com/docstrap/docstrap): [![NPM](https://nodei.co/npm/ink-docstrap.png?downloads=true)](https://nodei.co/npm/ink-docstrap/)
- [jasmine-node](https://github.com/mhevery/jasmine-node): DOM-less simple JavaScript BDD testing framework for Node


## License

MIT

_Generated by [package-json-to-readme](https://github.com/zeke/package-json-to-readme)_
