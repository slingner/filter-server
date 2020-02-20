const xss = require('xss');

const ReviewsService = {

  insertToFilterReviews(db, textValue, BeanId, userId ) {
    // return db.raw(`INSERT INTO filter_reviews (text, coffee_bean_id, user_id) VALUES (${textValue}, ${BeanId}, ${userId}`);
    return db('filter_reviews')
      .insert({text: textValue, coffee_bean_id: BeanId, user_id: userId})
      .returning(['text', 'coffee_bean_id', 'user_id']);
  },
  updateReview(knex, id, updatedNote) {
    return knex('notes')
      .where({id})
      .update(updatedNote);
  },
  getReviewsForUser(db, userId) {
    return db('filter_reviews')
      .select('filter_reviews.text', 'filter_reviews.coffee_bean_id')
      .where('filter_reviews.user_id', userId);
    // .join('filter_reviews', 'filter_reviews.coffee_bean_id', 'coffee_beans.id')
  },
};

module.exports = ReviewsService;
