'use strict'

const Skeleton = require('./class.js');

/**
 * create Record Handler
 *
 * @param {object} event event object
 * @param {object} context contect object
 * @param {callback} callback callback function
 */
module.exports.create = (event, context, callback) => {

    let doIt = new Skeleton(event, context);
    doIt.create();
};

/**
 * read One record Handler
 *
 * @param {object} event event object
 * @param {object} context contect object
 * @param {callback} callback callback function
 */
module.exports.readOne = (event, context, callback) => {

    let doIt = new Skeleton(event, context);
    doIt.readOne();
};

/**
 * readd all Records Handler
 *
 * @param {object} event event object
 * @param {object} context contect object
 * @param {callback} callback callback function
 */
module.exports.readAll = (event, context, callback) => {

    let doIt = new Skeleton(event, context);
    doIt.readAll();
};


/**
 *  updateRecord Handler
 *
 * @param {object} event event object
 * @param {object} context contect object
 * @param {callback} callback callback function
 */
module.exports.update = (event, context, callback) => {

    let doIt = new Skeleton(event, context);
    doIt.update();
};

/**
 * delete Record Handler
 *
 * @param {object} event event object
 * @param {object} context contect object
 * @param {callback} callback callback function
 */
module.exports.delete = (event, context, callback) => {

    let doIt = new Skeleton(event, context);
    doIt.delete();
};
