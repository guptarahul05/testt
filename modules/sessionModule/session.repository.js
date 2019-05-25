const Sequelize = require('sequelize');

const SessionPage = require('../../models/SessionPage');
const Session = require('../../models/Session');

exports.createSession = session => {
  return Session.create(session);
};

exports.updatePageNoAndCellNo = (cellCount, sessionId) => {
  return Session.update(
    {
      totalPages: Sequelize.literal(`totalPages + 1`),
      totalCellCount: Sequelize.literal(`totalCellCount + ${cellCount}`)
    },
    {
      where: { id: sessionId },
      returning: true,
      plain: true
    }
  );
};

exports.updateFinalInputOutput = (
  finalOutputFile,
  finalInputFile,
  sessionId
) => {
  return Session.update(
    {
      outputFilePath: finalOutputFile,
      inputFilePath: finalInputFile,
      status: 'EXCELCOMPLETED'
    },
    { where: { id: sessionId }, returning: true, plain: true }
  );
};

exports.updateStatus = (status, sessionId) => {
  return Session.update(
    {
      status: status
    },
    { where: { id: sessionId } }
  );
};

exports.createSessionPage = sessionPage => {
  return SessionPage.create(sessionPage);
};
