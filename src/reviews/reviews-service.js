const xss = require('xss');

const ReviewsService = {
  getById(db, id) {
    return db
      .from('filter_reviews AS review')
      .select(
        'review.id',
        'review.rating',
        'review.text',
        'review.date_created',
        'review.coffee_bean_id',
        db.raw(
          `row_to_json(
            (SELECT tmp FROM (
              SELECT
                usr.id,
                usr.user_name,
                usr.full_name,
                usr.nickname,
                usr.date_created,
                usr.date_modified
            ) tmp)
          ) AS "user"`
        )
      )
      .leftJoin(
        'thingful_users AS usr',
        'review.user_id',
        'usr.id'
      )
      .where('review.id', id)
      .first();
  },

  insertReview(db, newReview) {
    return db
      .insert(newReview)
      .into('filter_reviews')
      .returning('*')
      .then(([review]) => review)
      .then(review =>
        ReviewsService.getById(db, review.id)
      );
  },

  serializeReview(review) {
    return {
      id: review.id,
      rating: review.rating,
      text: xss(review.text),
      coffee_bean_id: review.coffee_bean_id,
      date_created: review.date_created,
      user: review.user || {},
    };
  }
};

module.exports = ReviewsService;
