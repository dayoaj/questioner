import { validationResult } from 'express-validator/check';

const ValidationResultHandler = (req, res) => {
  const result = validationResult(req).formatWith(
    ({ location, msg, param }) => `${location}[${param}]: ${msg}`
  );
  if (!result.isEmpty()) {
    return res.status(400).send({ status: 400, errors: result.array() });
  }
  return null;
};

export default ValidationResultHandler;
