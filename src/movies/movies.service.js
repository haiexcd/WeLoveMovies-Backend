const knex = require("../db/connection");



async function list() {
    return knex("movies as m")
        .select(
            "m.movie_id",
            "m.title",
            "m.runtime_in_minutes",
            "m.rating",
            "m.description",
            "m.image_url")
}

async function listShowing() {
    return knex("movies as m")
        .distinct()
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select(
            "m.movie_id",
            "m.title",
            "m.runtime_in_minutes",
            "m.rating",
            "m.description",
            "m.image_url")
        .where({ is_showing: true })
}

async function read(id) {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select(
            "m.movie_id",
            "m.title",
            "m.runtime_in_minutes",
            "m.rating",
            "m.description",
            "m.image_url",
            "m.created_at",
            "m.updated_at")
        .where({ "m.movie_id": id })
        .first()
}


async function getCritics(criticId) {
    return knex("critics").where({ critic_id: criticId });
  }
  
async function listReviews(movieId) {
    return knex("movies as m")
      .join("reviews as r", "m.movie_id", "r.movie_id")
      .where({ "m.movie_id": movieId });
  }

async function listTheaters(movieId) {
    return knex("movies as m")
      .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
      .join("theaters as t", "t.theater_id", "mt.theater_id")
      .select("t.*", "m.movie_id")
      .where({ "m.movie_id": movieId });
  }

module.exports = {
    list,
    listShowing,
    read,
    getCritics,
    listReviews,
    listTheaters,
}