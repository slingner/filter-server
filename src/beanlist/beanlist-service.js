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
      .distinct('coffee_beans.id','coffee_beans.bean_name', 'coffee_beans.bean_origin', 'coffee_beans.bean_masl', 'coffee_beans.bean_grower', 'coffee_beans.bean_process', 'coffee_beans.flavor_notes')
      .whereIn('coffee_beans_flavor_notes.flavor_note_id', id)
      .join('coffee_beans', function() {
        this.on('coffee_beans_flavor_notes.coffee_bean_id', '=', 'coffee_beans.id');
      }); 
  },
  getBeansForUser(db, id) {
    return db.raw(`SELECT * FROM saved
    JOIN coffee_beans ON saved.coffee_bean_id=coffee_beans.id
    WHERE saved.user_id=${id}`);
  }, 
  insertToSavedTable(db, BeanId, UserId) {
    return db.raw(`INSERT INTO saved (coffee_bean_id, user_id) VALUES (${BeanId},${UserId})`);
  },
};

module.exports = BeanListService;