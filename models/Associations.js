const User = require('./User');
const Session = require('./Session');
const SessionPage = require('./SessionPage');
function createAssociations(options = {}) {
  // if (options.isSeeding) {
  //   User.hasMany(Session, {
  //     constraints: false
  //   });
  // } else {
  Session.belongsTo(User);
  User.hasMany(Session);
  SessionPage.belongsTo(Session);
  Session.hasMany(SessionPage);
  // }
}
module.exports = createAssociations;
