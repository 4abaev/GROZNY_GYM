const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  login: {
    type: String,
  },
  password: {
    type: String,
  },
  subscription: [
    {
      ref: "Subscription",
      type: mongoose.SchemaTypes.ObjectId,
      default: null,
    },
  ],
  role: {
    type: String,
    default: "Пользователь",
  },
  image: {
    type: String,
    default: null,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  patronymic: {
    type: String,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  cash: {
    type: Number,
    default: 0,
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
