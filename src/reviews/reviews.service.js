const knex = require("../db/connection");

//put:
function update() {}
//should return a 404 if the ID given does not match any ID in the database
//updates an existing review, returning the updated review including the critic info

//destroy
function destroy() {}
//should return a 404 if the ID given does not match any ID in the database
//should delete the review record when given an existing review_id

module.exports = {
  update,
  destroy,
};
