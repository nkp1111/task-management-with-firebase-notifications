const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["emergency", "request", "report"],
    required: true,
    default: "request",
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

exports.Ticket = model("Ticket", ticketSchema);
