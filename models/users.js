
module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    id: {
      type: Sequelize.INT
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
   type: {
        type: Sequelize.STRING
      }
  });
 
  return users;
};