/**
 * File: GetAllHeroes/index.js
 * Description: file responsible for list all 'Heroes'
 */

const createMongoClient = require('../shared/mongo');

module.exports = async context => {
    const { db, connection } = await createMongoClient();

    const Heroes = db.collection('heroes');
    const res = await Heroes.find({});
    const body = await res.toArray();

    connection.close();

    context.res = {
        status: 200,
        body
    };
}