

const FlavorService = {
  getAllFlavorNotes(knex) {
    return knex
      .select('*')
      .from('flavor_notes');
  },
  getFlavorNoteFromBeanID(knex, id) {
    return knex
      .select('fn.flavor_name')
      .from('coffee_beans_flavor_notes AS cbfn')
      .join('flavor_notes AS fn').on('cbfn.flavor_note_id', '=', 'fn.id')
      .where('cbfn.coffee_bean_id', id);
  },
};

module.exports = FlavorService;