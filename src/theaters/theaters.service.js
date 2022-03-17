const knex = require("../db/connection");

async function list() {
    return knex("theaters");
}

async function getMovies(id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("m.*", "mt.is_showing")
        .where({ "t.theater_id": id });
}

module.exports = {
    list,
    getMovies,
};