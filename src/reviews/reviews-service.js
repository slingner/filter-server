const xss = require('xss');

const ReviewsService = {

  insertToFilterReviews(db, textValue, BeanId, userId ) {
    return db('filter_reviews')
      .insert({text: textValue, coffee_bean_id: BeanId, user_id: userId})
      .returning(['text', 'coffee_bean_id', 'user_id']);
  },
  // updateReview(knex, id, updatedNote) {
  //   return knex('notes')
  //     .where({id})
  //     .update(updatedNote);
  // },
  getReviewsForUser(db, userId, beanId) {
    return db('filter_reviews')
      .select('filter_reviews.id','filter_reviews.text', 'filter_reviews.coffee_bean_id')
      .where('filter_reviews.user_id', userId)
      .where('filter_reviews.coffee_bean_id', beanId);
  },
  removeReview(knex, id) {
    return knex('filter_reviews')
      .where({id})
      .delete();
  },
};

module.exports = ReviewsService;

// 'filter_reviews.id',
// .join('filter_reviews', 'filter_reviews.coffee_bean_id', 'coffee_beans.id')