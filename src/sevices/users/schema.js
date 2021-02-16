const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.__v
    return userObject
}

UserSchema.pre("save", async function (next) {
  const user = this;
  Pw = user.password;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(Pw, 10);
  }
  next();
});

module.exports = model("User", UserSchema);
