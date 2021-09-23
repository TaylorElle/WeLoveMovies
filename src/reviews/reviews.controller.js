const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

///middleware fxn that checks if reviewId exists
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    console.log(res.locals.review);
    return next();
  }
  console.log("review not found");
  return next({ status: 404, error: "Review cannot be found" });
}

async function update(req, res) {
  //should return a 404 if the ID given does not match any ID in the database
  console.log(req);
  const updatedReview = {
    ...req.body.data,
  };
  console.log(updatedReview);
  const data = await service.update(updatedReview);
  console.log(data);
  res.json({ data });
}

async function destroy(req, res) {
  const reviewId = res.locals.review.review_id;
  const data = await service.destroy(reviewId);
  res.sendStatus(204).json({ data: data });
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
