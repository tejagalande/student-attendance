module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      PRN: {
        type: Sequelize.INTEGER
      },
      NAME: {
        type: Sequelize.STRING
      },
      EMAIL: {
        type: Sequelize.STRING
      },
      MOBILE_NUMBER: {
        type: Sequelize.BIGINT
      },
      ATTENDANCE: {
        type: Sequelize.STRING
      }
    });
  
    return Student;
  };