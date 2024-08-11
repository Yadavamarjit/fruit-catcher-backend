import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  highscore: {
    type: Number,
  },
  device: {
    type: String,
    required: true,
  },
  country_code: {
    type: String,
  },
  country_name: { type: String },
  latlong: { type: String },
  city: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
