const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

///middleware fxn that checks if reviewId exists
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  console.log(req);
  console.log(req.params);
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: "Review cannot be found" });
}

async function destroy(req, res) {
  const reviewId = res.locals.review.review_id;
  await service.destroy(reviewId);
  res.sendStatus(204).json("No content");
}

async function update(req, res) {
  console.log("req.body", req.body);
  const updatedReview = {
    ...res.locals.review,
    ...req.body,
    review_id: res.locals.review.review_id,
  };
  const criticsInfo = await service.update(updatedReview);
  updatedReview.critic = criticsInfo;
  res.json({ data: updatedReview });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],

  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
