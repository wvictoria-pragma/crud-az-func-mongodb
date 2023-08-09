/**
 * File: UpdateHeroeById/index.js
 * Description: file responsible for update a 'Heroe' by Id
 */

const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongo');

module.exports = async function (context, req) {
    const { id } = req.params;
    const heroe = req.body || {};

    if (!id || !heroe) {
        context.res = {
            status: 400,
            body: 'Fields are required'
        };
        return;
    }

    const { db, connection } = await createMongoClient();
    const Heroes = db.collection('heroes');

    try {
        const heroes = await Heroes.findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: heroe }
        );

        connection.close();

        context.res = {
            status: 200,
            body: heroes
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Error updating a Heroe'
        };
    }
}