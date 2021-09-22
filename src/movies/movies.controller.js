const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { theaters } = require("../theaters/theaters.controller");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  // console.log(req.query);
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    // console.log(res.locals.movie);
    return next();
  }
  // console.log("not found");
  return next({ status: 404, error: "Movie cannot be found." });
}

async function read(req, res) {
  const movie = res.locals.movie;
  // console.log(movie);
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
  console.log(movieId);
  const criticsAndReviews = await service.listReviews(movieId);
  console.log(criticsAndReviews);
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
