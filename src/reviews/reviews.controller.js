const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

///middleware fxn that checks if reviewId exists

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

async function destroy(req, res) {
  const reviewId = res.locals.review.review_id;

  await service.delete(reivewId);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(destroy)],
};
