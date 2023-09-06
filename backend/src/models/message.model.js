import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
      unique: false,
    },
    body: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("message", messageSchema, "chat");
