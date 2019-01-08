import { validationResult } from 'express-validator/check';

const ValidationResultHandler = (req, res, next) => {
  const result = validationResult(req).formatWith(
    ({ location, msg, param }) => `${location}[${param}]: ${msg}`
  );
  if (!result.isEmpty()) {
    return res.json({ status: 400, errors: result.array() });
  }
  return next();
};

export default ValidationResultHandler;
