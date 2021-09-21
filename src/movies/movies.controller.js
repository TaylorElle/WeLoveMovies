const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  console.log(movieId);

  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, error: "Movie cannot be found." });
}

async function read(req, res) {
  const { movie } = res.locals;
  rse.json({ data: movie });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
