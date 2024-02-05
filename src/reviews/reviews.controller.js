const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

async function update(req, res, next) {
  const { review_id } = res.locals.review;

  try {
    const updatedReview = {
      ...req.body.data,
      review_id,
    };

    const updatedReviewData = await service.update(updatedReview, review_id);

    const critic = await service.getCritic(updatedReviewData.critic_id);

    res.json({
      data: {
        ...updatedReviewData,
        critic,
      },
    });
  } catch (error) {
    next(error);
  }
}

function destroy(req, res, next) {
  service.destroy(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), destroy],
};