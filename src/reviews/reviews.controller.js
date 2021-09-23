const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

///middleware fxn that checks if reviewId exists

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  console.log(reviewId);
  const review = await service.read(reviewId);
  console.log(review);
  if (review) {
    res.locals.review = review;
    console.log(res.locals.review);
    next();
  }
  console.log("review not found");
  return next({ status: 404, error: "Review cannot be found" });
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

async function destroy(req, res) {
  const reviewId = res.locals.review.review_id;

  await service.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
