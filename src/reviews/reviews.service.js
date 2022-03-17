const knex = require("../db/connection");

function list() {
  return knex("reviews");
}

function read(id) {
  return knex("reviews").where({ review_id: id });
}

function update(updatedReview, id) {
  return knex("reviews")
    .select("*")
    .where({ review_id: id })
    .update({ ...updatedReview, updated_at: knex.fn.now() })
    .then((updatedRecords) => updatedRecords[0]);
}
 

function getCritic(id) {
  return knex("critics").where({ critic_id: id }).select();
}

function destroy(id) {
  return knex("reviews").where({ review_id: id }).del();
}

module.exports = {
  list,
  read,
  update,
  getCritic,
  destroy,
};