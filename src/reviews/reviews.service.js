const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .groupBy("review_id")
    .first();
}

//put:
function update(updatedReview) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({ "r.review_id": updatedReview.review_id })
    .groupBy("critic_id")
    .select("r.*", "c.*")
    .update(updatedReview, "*")
    .then((results) => {
      results.forEach((oneResult) => {
        const criticArr = [];
        const addingACritic = addCritic(oneResult);
        criticArr.push(addingACritic);
      });
      return criticArr;
    });
}
//updates an existing review, returning the updated review including the critic info

//destroy
function destroy(reviewId) {
  return knex("reviews as r").select("*").where({ review_id: reviewId }).del();
}
//should return a 404 if the ID given does not match any ID in the database
//should delete the review record when given an existing review_id

module.exports = {
  read,
  update,
  destroy,
};
