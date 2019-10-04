function makeResponse(res, status, message, result, platformstatus = 200) {
  res.statusMessage = message;
  res.status(status).send({
    code: status || platformstatus,
    message,
    app_version: '1.0.0',
    result,
  }).end();
}


module.exports = makeResponse;
