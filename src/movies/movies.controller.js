const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, error: "Movie cannot be found." });
}

async function read(req, res) {
  const movie = res.locals.movie;
  res.json({ data: movie });
}

async function list(req, res) {
  if (req.query.is_showing) {
    res.json({ data: await service.isShowing() });
  }
  res.json({ data: await service.list() });
}

async function readMoviesAndTheaters(req, res) {
  const { movieId } = req.params;
  const moviesAndTheaters = await service.readMoviesAndTheaters(movieId);
  res.json({ data: moviesAndTheaters });
}

async function listReviews(req, res) {
  const { movieId } = req.params;
  const criticsAndReviews = await service.listReviews(movieId);
  res.json({ data: criticsAndReviews });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readMoviesAndTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
};
