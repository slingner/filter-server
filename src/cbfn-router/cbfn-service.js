const cbfnService = {
  getBeanByFlavorNoteID(knex, id) {
    return knex
      .from('coffee_beans_flavor_notes')
      .select('coffee_beans.bean_name')
      .where('coffee_beans_flavor_notes.flavor_note_id', id)
      .join('coffee_beans', function() {
        this.on('coffee_beans_flavor_notes.coffee_bean_id', '=', 'coffee_beans.id');
      });
  }
};

module.exports = cbfnService;



// const cbfnService = {
//   getBeanByFlavorNoteID(knex, id) {
//     return knex.raw(`SELECT
//     cb.bean_name
//   FROM
//     coffee_beans_flavor_notes cbfn
//   JOIN coffee_beans AS cb ON cbfn.coffee_bean_id = cb.id
//   WHERE
//     cbfn.flavor_note_id = ${id};`);
//   }
// };