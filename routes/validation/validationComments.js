const Joi = require('joi');

const rulesComment = Joi.object({
    _id: Joi.allow(),
    name: Joi.string().min(3).max(30).pattern(/^[a-zA-ZА-Яа-яЁёієґї\s]+$/i).required(),
    comment:  Joi.string().min(1).required(),
    });

function validateComment(req, res, next) {
    const {error} = rulesComment.validate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    next();
}

module.exports = { validateComment }