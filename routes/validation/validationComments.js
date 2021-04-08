const Joi = require('joi')

const schemaCreateComment = Joi.object({
    name: Joi.string().min(3).max(30).pattern(/^[a-zA-ZА-Яа-яЁёієґї\s]+$/i).required(),
    comment:  Joi.string().min(1).required(),
});

const schemaUpdateComment = Joi.object({
    name: Joi.string().min(3).max(30).pattern(/^[a-zA-ZА-Яа-яЁёієґї\s]+$/i).optional(),
    comment:  Joi.string().min(1).optional(),
});

const validateComment = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).send('Field '+ error.message)
        return
    }
    next()
}

module.exports.validateCreateComment = validateComment(schemaCreateComment)
module.exports.validateUpdateComment = validateComment(schemaUpdateComment)