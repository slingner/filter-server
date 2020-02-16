





const userService = {

  getBeansForUser(db, id) {
    return db.raw(`SELECT * FROM saved
    join coffee_beans on saved.coffee_bean_id=coffee_beans.id
    where saved.user_id=${id}`);
  }
};

module.exports = userService;