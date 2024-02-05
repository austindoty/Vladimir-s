const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function update(updatedReview, id) {
  const { review_id, ...rest } = updatedReview;

  await knex("reviews").where({ review_id: id }).update({ ...rest });

  const updatedReviewData = await read(id);

  if (!updatedReviewData) {
    throw new Error("Failed to retrieve updated review after update.");
  }

  return updatedReviewData;
}

module.exports = {
  read,
  destroy,
  getCritic,
  update,
};
