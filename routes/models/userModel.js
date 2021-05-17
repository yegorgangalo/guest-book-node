const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { Sex } = require('../../helpers/constants');
const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      default: 'Guest',
    },
    sex: {
      type: String,
      enum: {
        values: [Sex.MALE, Sex.FEMALE, Sex.NONE],
        massage: 'You can only choose from the above',
      },
      default: Sex.NONE,
    },
    email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.pre('create', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// userSchema.static.findByEmail = function(email) {
//     return this.findOne({ email });
// });

const UserModel = model('UserModel', userSchema);

module.exports = UserModel;
