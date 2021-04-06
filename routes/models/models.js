const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'is required'],
    minlength: [3, 'Min length 3 characters'],
    maxlength: [30, 'Max length 30 characters'],
    match: /^[a-zA-ZА-Яа-яЁёієґї\s]+$/i
  },
  comment: {
    type: String,
    required: [true, 'is required'],
    minlength: [1, 'Min length 1 character'],
  },
}, { versionKey: false, timestamps: true })

const CommentModel = model('CommentModel', commentSchema);
module.exports = {CommentModel}