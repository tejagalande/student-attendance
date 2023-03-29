module.exports = (sequelize, Sequelize) => {
    const Excel = sequelize.define("excel", {
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
  
    return Excel;
  };