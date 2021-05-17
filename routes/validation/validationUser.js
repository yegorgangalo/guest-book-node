const Joi = require('joi');
const { Sex } = require('../../helpers/constants');

const schemaCreateUser = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-ZА-Яа-яЁёієґї\s]+$/i),
  sex: Joi.string().valid(Sex.MALE, Sex.FEMALE, Sex.NONE),
  email: Joi.string()
    .min(5)
    .pattern(/\S+@\S+\.\S+/i)
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const validateUser = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send('Field ' + error.message);
    return;
  }
  next();
};

module.exports.validateCreateUser = validateUser(schemaCreateUser);
