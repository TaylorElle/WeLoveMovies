const knex = require("../db/connection");

//return a list of all theaters, including the 'movies' each theatre is showing

function list() {
  return knex("theaters").select("*");
}

module.exports = {
  list,
};
