module.exports = (sequelize, Sequelize) => {
    const Exceldownload = sequelize.define("exceldownload", {
        COLLEGE: {
            type: Sequelize.INTEGER
          },
          BRANCH: {
            type: Sequelize.INTEGER
          },
          DIVISION: {
            type: Sequelize.INTEGER
          },
          BATCH: {
            type: Sequelize.INTEGER
          },
          DATE: {
            type: Sequelize.INTEGER
          },
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
  
    return Exceldownload;
  };