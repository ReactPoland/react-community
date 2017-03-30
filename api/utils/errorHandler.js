import serverResp from './serverResp';

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send(serverResp.error(err.message));
};

export default errorHandler;
