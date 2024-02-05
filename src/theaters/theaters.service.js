const knex = require("../db/connection");

function list() {
  return knex("theaters").select("*");
}

function listMovies(theaterId) {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("m.*", "mt.is_showing")
    .where({ "t.theater_id": theaterId });
}

module.exports = {
  list,
  listMovies,
};
