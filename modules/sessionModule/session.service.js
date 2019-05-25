const sessionRepo = require('./session.repository');

const fs = require('fs');
const request = require('request-promise');

const urls = {
  serverAddress: 'http://localhost:5000/',
  sessionStart: 'sessionStart',
  convert: 'convert',
  inSessionConvert: 'inSessionConvert',
  makeExcel: 'makeExcel',
  sessionEnd: 'sessionEnd'
};
exports.test = data => {
  return data;
};
exports.startSession = async (data, filePath, userId) => {
  const requestOptions = {
    url: `${urls.serverAddress}${urls.sessionStart}`,
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    formData: {
      data: JSON.stringify(data),
      file: fs.createReadStream(filePath)
    }
  };
  request(requestOptions)
    .then(startSessionResponse => {
      if (startSessionResponse.isSuccessful) {
        const sessionId = startSessionResponse.data.sessionId;
        return sessionRepo.createSession({
          id: sessionId,
          userId,
          status: 'STARTED',
          totalPages: 0,
          totalCellCount: 0
        });
      } else {
        return { isSuccessful: false, error: startSessionResponse.error };
      }
    })
    .then(createSession => {
      return { isSuccessful: true, body: startSessionResponse.data };
    })
    .catch(err => {
      return { isSuccessful: false, error: e };
    });

  // try {
  //   const startSessionResponse = await request(requestOptions);
  //   if (startSessionResponse.isSuccessful) {
  //     const sessionId = startSessionResponse.data.sessionId;
  //     console.log(userId);
  //     const createSession = await sessionRepo.createSession({
  //       id: sessionId,
  //       userId: userId,
  //       status: 'STARTED',
  //       totalPages: 0,
  //       totalCellCount: 0
  //     });
  //     const data = startSessionResponse.data;
  //     return { isSuccessful: true, data: data, sessionId: createSession.id };
  //   } else {
  //     return { isSuccessful: false, error: startSessionResponse.error };
  //   }
  // } catch (e) {
  //   return { isSuccessful: false, error: e };
  // }
};

exports.convert = async data => {
  const requestOptions = {
    url: `${urls.serverAddress}${urls.convert}`,
    method: 'POST',
    json: true,
    body: { ...data }
  };
  console.log(data, 'data');
  request(requestOptions)
    .then(convertResponse => {
      if (convertResponse.isSuccessful) {
        console.log(convertResponse.data, 'convertResponse');
        return sessionRepo.updatePageNoAndCellNo(
          convertResponse.data.cellCount,
          data.sessionId
        );
      } else {
        return { isSuccessful: false, error: { ...convertResponse.error } };
      }
    })
    .then(updatePageNoAndCellNo => {
      return sessionRepo.createSessionPage({
        sessionId: data.sessionId,
        pageNumber: convertResponse.pageNo,
        cellCount: convertResponse.cellCount,
        pageRawJson: convertResponse.rawJson
      });
    })
    .then(sessionPage => {
      return {
        isSuccessful: true,
        body: { ...convertResponse.data }
      };
    })
    .catch(e => {
      return { isSuccessful: false, error: e };
    });
  // try {
  //   const convertResponse = await request(requestOptions);
  //   if (convertResponse.isSuccessful) {
  //     console.log(convertResponse.data, 'convertResponse');
  //     const updatePageNoAndCellNo = await sessionRepo.updatePageNoAndCellNo(
  //       convertResponse.data.cellCount,
  //       data.sessionId
  //     );
  //     return {
  //       isSuccessful: true,
  //       data: { ...convertResponse.data },
  //       db: { ...updatePageNoAndCellNo }
  //     };
  //   } else {
  //     return { isSuccessful: false, error: { ...convertResponse.error } };
  //   }
  // } catch (e) {
  //   return { isSuccessful: false, error: e };
  // }
};

exports.inSessionConvert = async (data, filePath) => {
  const requestOptions = {
    url: `${urls.serverAddress}${urls.inSessionConvert}`,
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    formData: {
      data: JSON.stringify(data),
      file: fs.createReadStream(filePath)
    }
  };
  request(requestOptions)
    .then(inSessionConvertResponse => {
      if (inSessionConvertResponse.isSuccessful) {
        return sessionRepo.updatePageNoAndCellNo(
          inSessionConvertResponse.data.cellCount,
          data.sessionId
        );
      } else {
        return {
          isSuccessful: false,
          error: { ...inSessionConvertResponse.error }
        };
      }
    })
    .then(updatePageNoAndCellNo => {
      return sessionRepo.createSessionPage({
        sessionId: data.sessionId,
        pageNumber: inSessionConvertResponse.pageNo,
        cellCount: inSessionConvertResponse.cellCount,
        pageRawJson: inSessionConvertResponse.rawJson
      });
    })
    .then(sessionPage => {
      return {
        isSuccessful: true,
        body: { ...convertResponse.data }
      };
    })
    .catch(err => {
      return { isSuccessful: false, error: e };
    });
  // try {
  //   const inSessionConvertResponse = await request(requestOptions);
  //   if (inSessionConvertResponse.isSuccessful) {
  //     console.log(inSessionConvertResponse.data, 'inSessionConvertResponse');
  //     const updatePageNoAndCellNo = await sessionRepo.updatePageNoAndCellNo(
  //       inSessionConvertResponse.data.cellCount,
  //       data.sessionId
  //     );
  //     return {
  //       isSuccessful: true,
  //       data: { ...inSessionConvertResponse.data },
  //       db: { ...updatePageNoAndCellNo }
  //     };
  //   } else {
  //     return {
  //       isSuccessful: false,
  //       error: { ...inSessionConvertResponse.error }
  //     };
  //   }
  // } catch (e) {
  //   return { isSuccessful: false, error: e };
  // }
};

exports.makeExcel = async data => {
  const requestOptions = {
    url: `${urls.serverAddress}${urls.makeExcel}`,
    method: 'POST',
    json: true,
    body: { ...data }
  };
  console.log(data, 'data');
  try {
    const makeExcelResponse = await request(requestOptions);
    if (makeExcelResponse.isSuccessful) {
      console.log(makeExcelResponse.data, 'makeExcelResponse');
      const updateFinalInputOutput = await sessionRepo.updateFinalInputOutput(
        makeExcelResponse.data.excelPath,
        makeExcelResponse.data.finalPdfPath,
        data.sessionId
      );
      return {
        isSuccessful: true,
        data: { ...makeExcelResponse.data },
        db: { ...updateFinalInputOutput }
      };
    } else {
      return { isSuccessful: false, error: { ...makeExcelResponse.error } };
    }
  } catch (e) {
    return { isSuccessful: false, error: e };
  }
};

exports.sessionEnd = async body => {
  const requestOptions = {
    url: `${urls.serverAddress}${urls.sessionEnd}`,
    method: 'POST',
    json: true,
    body: { ...body }
  };
  try {
    const sessionEndResponse = await request(requestOptions);
    if (sessionEndResponse.isSuccessful) {
      console.log(sessionEndResponse, 'sessionEndResponse');
      const updateSessionStatus = sessionRepo.updateStatus(
        'COMPLETED',
        body.sessionId
      );
      return {
        isSuccessful: true,
        body: { ...sessionEndResponse.data },
        db: { ...updateSessionStatus }
      };
    } else {
      return { isSuccessful: false, error: { ...updateSessionStatus.error } };
    }
  } catch (e) {
    return { isSuccessful: false, error: e };
  }
};
// const options = {
//   url: `http://localhost:5000/sessionStart`,
//   method: 'POST',
//   json: true,
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   },
//   // use by JSON.parse and then send by JSON.stringify
//   formData: {
//     data: req.body.data,
//     file: fs.createReadStream(req.file.path)
//   }
// };
