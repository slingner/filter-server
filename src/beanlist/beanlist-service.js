const xss = require('xss');
const Treeize = require('treeize');

const BeanListService = {
  getAllBeans(knex) {
    return knex
      .select('*')
      .from('coffee_beans');
  },
  getBeanById(knex, id) {
    return knex
      .select('*')
      .from('coffee_beans')
      .where('id', id);
  },
  getFlavorNoteFromBeanID(knex, id) {
    return knex
      .select('fn.flavor_name')
      .from('coffee_beans_flavor_notes AS cbfn')
      .join('flavor_notes AS fn').on('cbfn.flavor_note_id', '=', 'fn.id')
      .where('cbfn.coffee_bean_id', id);
  },
  getBeanByFlavorNoteID(knex, id) {
    return knex
      .from('coffee_beans_flavor_notes')
      .distinct('coffee_beans.bean_name', 'coffee_beans.bean_origin', 'coffee_beans.bean_masl', 'coffee_beans.bean_grower', 'coffee_beans.bean_process', 'coffee_beans.flavor_notes' )
      .whereIn('coffee_beans_flavor_notes.flavor_note_id', id)
      .join('coffee_beans', function() {
        this.on('coffee_beans_flavor_notes.coffee_bean_id', '=', 'coffee_beans.id');
      });
  },
  getBeansForUser(db, id) {
    return db
      .select('*')
      .from('filter_users.coffee_bean_id')
      .where('id', id);
  }, 
  insertBeanIdToUsersCoffeeBeanIdTable(db, coffeeBeanid) {
    return db
      .insert(coffeeBeanid)
      .into('filter_users.coffee_bean_id');
  },
  // getReviewsForBean(db, coffee_bean_id) {
  //   return db
  //     .from('filter_reviews AS review')
  //     .select(
  //       'review.id',
  //       'review.rating',
  //       'review.text',
  //       'review.date_created',
  //       ...userFields
  //     )
  //     .where('review.coffee_bean_id', coffee_bean_id)
  //     .leftJoin(
  //       'filter_users AS usr',
  //       'review.user_id',
  //       'usr.id'
  //     )
  //     .groupBy('review.id', 'usr.id');
  // },

  serializeBeans(beans) {
    return beans.map(this.serializeBean);
  },

  serializeBean(bean) {
    const beanTree = new Treeize();

    //`treeize` only accepts arrays of objects, and we want to use a single object.
    const beanData = beanTree.grow([ bean ]).getData()[0];

    return {
      id: beanData.id,
      title: xss(beanData.title),
      content: xss(beanData.content),
      date_created: beanData.date_created,
      image: beanData.image,
      user: beanData.user || {},
      number_of_reviews: Number(beanData.number_of_reviews) || 0,
      average_review_rating: Math.round(beanData.average_review_rating) || 0,
    };
  },

  serializeBeanReviews(reviews) {
    return reviews.map(this.serializeBeanReview);
  },

  serializeBeanReview(review) {
    const reviewTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const reviewData = reviewTree.grow([ review ]).getData()[0];

    return {
      id: reviewData.id,
      rating: reviewData.rating,
      coffee_bean_id: reviewData.coffee_bean_id,
      text: xss(reviewData.text),
      user: reviewData.user || {},
      date_created: reviewData.date_created,
    };
  },

};

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.nickname AS user:nickname',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
];

module.exports = BeanListService;