module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define("attendances", {
     COLLEGE:{
        type:Sequelize.TEXT
     },
     BRANCH:{
        type:Sequelize.TEXT
     },
     DIVISION: {
        type: Sequelize.TEXT
      },
      Date: {
        type: Sequelize.DATE
      },
     BATCH: {
        type: Sequelize.TEXT
      },
      START_TIME: {
        type: Sequelize.TEXT
      },
      PRN: {
        type: Sequelize.BIGINT
      },
      STUDENT_NAME: {
        type: Sequelize.TEXT
      },
      MOBILE: {
        type: Sequelize.BIGINT
      },
      ATTENDANCE: {
        type: Sequelize.TEXT
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE

      }
     
    });
  
    return Attendance;
  };