/**
 * File: GetHeroeById/index.js
 * Description: file responsible for get a 'Heroe' by Id
 */

const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongo');

module.exports = async function (context, req) {
    const { id } = req.params;

    if (!id) {
        context.res = {
            status: 400,
            body: 'Please enter the correct Heroe Id number!'
        };

        return;
    }

    const { db, connection } = await createMongoClient();

    const Heroes = db.collection('heroes');

    try {
        const body = await Heroes.findOne({ _id: ObjectID(id) });

        connection.close();

        context.res = {
            status: 200,
            body
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Error listing Heroe by Id.'
        };
    }
}