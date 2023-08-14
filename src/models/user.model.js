import mongoose from "mongoose";

const userModelName = "user";
const userModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
});
const userModelCollection = "users";

const userModel = mongoose.model(
  userModelName,
  userModelSchema,
  userModelCollection
);

export default userModel;
