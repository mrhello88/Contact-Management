const mongoose = require("mongoose");
const { Schema } = mongoose;
const date = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(now.getDate()).padStart(2, "0"); // Pad single digits with leading zero

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
const checkerSchema = new Schema({
  userId: {
    type:Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  shopName: {
    type: String,
    required: true, 
    trim: true,
  },
  province: {
    type: String,
    required: true,
    enum: ["Punjab", "Sindh", "KhyberPakhtunkhwa", "Balochistan","Islamabad","GilgitBaltistan","AzadJammuAndKashmir",],
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    default: date
  },
});


module.exports = mongoose.model("checker", checkerSchema);
