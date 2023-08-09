/**
 * File: CreateHeroe/index.js
 * Description: file responsible for creating a new 'Heroe'
 */

const createMongoClient = require('../shared/mongo');

module.exports = async function (context, req) {
    const heroe = req.body || {};

    if (heroe) {
        console.log(heroe);
        context.res = {
            status: 400,
            body: 'Heroe data is required!'
        };
    }

    const { db, connection } = await createMongoClient();

    const Heroes = db.collection('heroes');

    try {
        const heroes = await Heroes.insert(heroe);

        connection.close();

        context.res = {
            status: 201,
            body: heroes.ops[0]
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Error creating a new Heroe'
        }
    }
}