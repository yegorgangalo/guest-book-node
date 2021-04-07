const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'is required'],
  },
  comment: {
    type: String,
    required: [true, 'is required'],
  },
}, { versionKey: false, timestamps: true })

const CommentModel = model('CommentModel', commentSchema);
module.exports = {CommentModel}