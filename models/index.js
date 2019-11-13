const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Medicine = require('./medicine')(sequelize, Sequelize);
db.Schedule = require('./schedule')(sequelize, Sequelize);
db.Intake = require('./intake')(sequelize, Sequelize);
db.Recommend = require('./recommend')(sequelize, Sequelize);

db.User.belongsToMany(db.Medicine, {through: db.Schedule});
db.Medicine.belongsToMany(db.User, {through: db.Medicine});

db.Schedule.hasOne(db.Intake);
db.Intake.belongsTo(db.Schedule);

db.Schedule.belongsTo(db.User);
db.Schedule.belongsTo(db.Medicine);

db.Medicine.belongsToMany(db.Medicine, {
  foreignKey: 'recoMediID',
  as: 'RecoMedicines',
  through: db.Recommend,
});
db.Medicine.belongsToMany(db.Medicine, {
  foreignKey: 'focusMediID',
  as: 'FocusMedicines',
  through: db.Recommend,
});

module.exports = db;