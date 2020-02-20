const userService = {

  getBeansForUser(knex, id) {
    return knex('saved')
      .select('*')
      .join('coffee_beans', 'saved.coffee_bean_id', 'coffee_beans.id')
      .where('saved.user_id', id);
  },
  removeBeanFromUserList(knex, userId, id) {
    return knex('saved')
      .where('saved.user_id', userId)
      .where('coffee_bean_id', id)
      .delete();
  },
  getBeanByUserAndFlavor(knex, userId, flavorId) {
    return knex('saved')
      .distinct('coffee_beans.id','coffee_beans.bean_name', 'coffee_beans.bean_origin', 'coffee_beans.bean_masl', 'coffee_beans.bean_grower', 'coffee_beans.bean_process', 'coffee_beans.flavor_notes')
      .join('coffee_beans', 'saved.coffee_bean_id', 'coffee_beans.id')
      .join('coffee_beans_flavor_notes', 'saved.coffee_bean_id', 'coffee_beans_flavor_notes.coffee_bean_id')
      .where('saved.user_id', userId)
      .whereIn('coffee_beans_flavor_notes.flavor_note_id', flavorId);
  },
};

module.exports = userService;