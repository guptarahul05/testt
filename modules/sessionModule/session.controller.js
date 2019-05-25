const sessionService = require('./session.service');

const fs = require('fs');
exports.startSession = async (req, res, next) => {
  const response = await sessionService.startSession(
    JSON.parse(req.body.data),
    req.file.path,
    req.decoded.userId
  );
  res.status(200).json({ r: response });
};

exports.convert = async (req, res, next) => {
  const response = await sessionService.convert(req.body);
  res.status(200).json({ r: response });
};

exports.inSessionConvert = async (req, res, next) => {
  const response = await sessionService.inSessionConvert(
    JSON.parse(req.body.data),
    req.file.path
  );
  res.status(200).json({ r: response });
};

exports.makeExcel = async (req, res, next) => {
  const response = await sessionService.makeExcel(req.body);
  res.status(200).json({ r: response });
};

exports.sessionEnd = async (req, res, next) => {
  const response = await sessionService.sessionEnd(req.body);
  res.status(200).json(response);
};
exports.test = (req, res, next) => {
  const result = sessionService.test(req.body);
  res.json(result);
};

// 'data: {userId: rahul,pageNo : 1,checkForTable : False}'
