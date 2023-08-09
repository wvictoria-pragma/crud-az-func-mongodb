/**
 * File: DeleteHeroeById/index.js
 * Description: file responsible for delete a 'Heroe' by Id
 */

const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongo');

module.exports = async function (context, req) {
    const { id } = req.params;

    if (!id) {
        context.res = {
            status: 400,
            body: 'The fields are required!'
        };

        return;
    }

    const { db, connection } = await createMongoClient();

    const Heroes = db.collection('heroes');

    try {
        await Heroes.findOneAndDelete({ _id: ObjectID(id) });

        connection.close();

        context.res = {
            status: 204,
            body: 'Heroe deleted successfully!'
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Error Deleting Heroe' + id
        };
    }
}