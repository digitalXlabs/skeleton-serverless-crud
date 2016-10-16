'use strict'



/**
 * Example class for Skeleton CRUD
 */
class Skeleton {


    /**
     * constructor - class constructor
     * Creates class properties from the event, context and callback
     * passed in parameters
     *
     * @param  {object} event    description
     * @param  {object} context  description
     * @param  {function} callback description
     * @return {void}
     */

    constructor(event, context, callback) {
        this.event = event;
        this.context = context;
        this.callback = callback;

        // this.responseError = null; // init these
        // this.responseSuccess = null;
    }

    /**
     * getSQSHandler - description
     *
     * @return {type}  description
     */
    getClient() {
        let AWS = require('aws-sdk')
        AWS.config.update({
            region: "eu-west-1",
            // endpoint: "http://localhost:8044"
        });

        return new AWS.DynamoDB.DocumentClient();
    }

    /**
     * creates a record
     *
     * @return {type}  description
     */
    create() {
        let quintus = this;

        let fs = require('fs');

        // get teh data from the event body
        let data = JSON.parse(this.event.body);

        let mydata = {
            "name": data.name,
            "description": data.description,
            "url": data.url,
            "uuid": require('uuid').v4(), // add a unitque identifier
            "updated": new Date().toISOString() // add the updated time to now
        }

        // read in the schema
        let file = fs.readFileSync(process.cwd() + "/schema.json");
        let schema = JSON.parse(file);

        // now lets validate it
        this.validate(mydata, schema)
            .then(function() {
                return quintus.dbWrite(mydata)
            })
            .then(function(res) {
                return quintus.successCallback(res)
            })
            .catch((err) => {
                return quintus.errorCallback(err)
            });
    }


    /**
     * readOne - description
     *
     * @return {type}  description
     */
    readOne() {
        let quintus = this;

        // get teh data from the event body
        let data = this.event.pathParameters.id

        // now lets validate it
        this.dbRead(data)
            .then(function(res) {
                return quintus.successCallback(res)
            })
            .catch((err) => {
                return quintus.errorCallback(err)
            });
    }


    /**
     * readAll - scnas table and retrieves all records
     *
     * @return {type}  description
     */
    readAll() {
        let quintus = this;
        quintus.results = [];

        this.dbReadAll()
            .then(function(res) {
                return quintus.successCallback(res)
            })
            .catch((err) => {
                return quintus.errorCallback(err)
            });
    }


    /**
     * update - description
     *
     * @return {type}  description
     */
    update() {
        let quintus = this;

        let fs = require('fs');

        // get teh data from the event body
        let data = JSON.parse(this.event.body);

        // read in the schema
        let file = fs.readFileSync(process.cwd() + "/schema.json");
        let schema = JSON.parse(file);

        // add a unitque identifier
        data.uuid = this.event.pathParameters.id;

        // add the updated time to now
        data.updated = new Date().toISOString();

        // now lets validate it
        this.validate(data, schema)
            .then(function() {
                return quintus.dbUpdate(data)
            })
            .then(function(res) {
                return quintus.successCallback(res)
            })
            .catch((err) => {
                return quintus.errorCallback(err)
            });
    }


    /**
     * delete - description
     *
     * @return {type}  description
     */
    delete() {
        let quintus = this;

        // get teh data from the event body
        let data = this.event.pathParameters.id

        // now lets validate it
        this.dbDelete(data)
            .then(function(res) {
                return quintus.successCallback(res)
            })
            .catch((err) => {
                return quintus.errorCallback(err)
            });
    }



    /**
     * validate - validates an object against the given schema
     *
     * @param  {object} data   data object
     * @param  {string} schema schema or url of the schema to use
     * @return {type}        description
     */
    validate(data, schema) {
        let validator = require('json-schema-remote');
        return new Promise(function(resolve, reject) {
            validator.validate(data, schema)
                .then(function() {
                    resolve(true);
                })
                .catch(function(error) {
                    reject(error);
                });
        })
    }


    /**
     * dbDelete - remoes a record from the tables
     *
     * @param  {sting} id description
     * @return {promise}    description
     */
    dbDelete(id) {
        let lucilla = this;
        let params = {
            TableName: 'skeleton',
            Key: {
                uuid: id
            }
        };
        console.log("Deleting record with id " + id + "from the table..." + params.TableName);
        return new Promise(function(resolve, reject) {
            lucilla.getClient().delete(params).promise()
                .then(function(data) {
                    resolve(data);
                })
                .catch(function(err) {
                    reject(err);
                })
        })

    }


    /**
     * dbRead - reads a single record from the db
     *
     * @param  {type} id description
     * @return {type}    description
     */
    dbRead(id) {
        let lucilla = this;
        let params = {
            TableName: 'skeleton',
            Key: {
                uuid: id
            }
        };
        console.log("Reading record with id " + id + "from the table..." + params.TableName);
        return new Promise(function(resolve, reject) {
            lucilla.getClient().get(params).promise()
                .then(function(data) {
                    resolve(data);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    }



    /**
     * dbReadAll - retireives all records from teh table
     *
     * @return {promise}
     */
    dbReadAll() {
        let lucilla = this;
        let params = {
            TableName: 'skeleton'
        };

        let results = [];
        console.log("Retrieving all records from the table..." + params.TableName);
        return new Promise(function(resolve, reject) {
            lucilla.getClient().scan(params).promise()
                .then(function(data) {
                    console.log("Scan succeeded.");
                    data.Items.forEach(function(res) {
                        results.push(res);
                    });
                    resolve(results);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    }

    /**
     * dbUpdate - updates record in db
     *
     * @param  {object} validated data object
     * @return {mixed}      responses
     */
    dbUpdate(data) {
        let lucilla = this;
        let params = {
            TableName: 'skeleton',
            Item: data
        };
        console.log("updating a record with id " + data.uuid + "..." + params.TableName);
        return new Promise(function(resolve, reject) {
            lucilla.getClient().put(params).promise()
                .then(function(data) {
                    resolve(data);
                })
                .catch(function(err) {
                    reject(err);
                })
        })
    }

    /**
     * write - writes the data to the data store
     * ideally this would go in DAL as doubtless you'll need it elsewhere
     *
     * @param  {object} data the record
     * @return {promise}      promise results or error
     */
    dbWrite(data) {
            let lucilla = this;
            let params = {
                TableName: 'skeleton',
                Item: data
            };
            console.log("Adding a new item..." + params.TableName);
            return new Promise(function(resolve, reject) {
                lucilla.getClient().put(params).promise()
                    .then(function(data) {
                        resolve(data);
                    })
                    .catch(function(err) {
                        reject(err);
                    })
            })

        } // write



    /**
     * sets up the error response object
     *
     * @return {type}  description
     */
    errorCallback(err) {
        this.responseError = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(err),
        }
        console.log(err);
        this.context.fail(this.responseError);

    }

    /**
     * sets up the success response object
     *
     * @return {type}  description
     */
    successCallback(result) {
        this.responseSuccess = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(result),
        };

        this.context.succeed(this.responseSuccess);

    }
}

module.exports = Skeleton;
