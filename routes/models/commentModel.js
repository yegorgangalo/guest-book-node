const { Schema, model, SchemaTypes } = require('mongoose');

const commentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'is required'],
    },
    comment: {
      type: String,
      required: [true, 'is required'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'UserModel',
    },
  },
  { versionKey: false, timestamps: true },
);

const CommentModel = model('CommentModel', commentSchema);
module.exports = CommentModel;
