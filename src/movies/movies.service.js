const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const mappedCritics = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .groupBy("movies.movie_id")
    .first();
}

function list() {
  return knex("movies").select("*").groupBy("movies.movie_id");
}

function isShowing() {
  return knex("movies as m")
    .select("*")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
}

function readMoviesAndTheaters(movieId) {
  return knex("movies as m")
    .select("mt.*", "t.*")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movieId, "mt.is_showing": true });
}

function listReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then((result) => {
      console.log(result);
      const criticArr = [];
      console.log(criticArr);
      result.forEach((item) => {
        const addedCritic = mappedCritics(item);
        console.log(addedCritic);
        criticArr.push(addedCritic);
        console.log(criticArr);
      });

      return criticArr;
    });
}

module.exports = {
  read,
  list,
  isShowing,
  readMoviesAndTheaters,
  listReviews,
};
