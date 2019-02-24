import { validationResult } from 'express-validator/check';

const ValidationResultHandler = req => {
  const result = validationResult(req).formatWith(
    ({ location, msg, param }) => `${location}[${param}]: ${msg}`
  );
  if (result.isEmpty()) {
    return null;
  }
  return result.array();
};

export default ValidationResultHandler;
