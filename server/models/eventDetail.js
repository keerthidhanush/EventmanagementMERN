const mongoose = require("mongoose");

// Define the event detail schema
const eventDetailSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Event Name
  date: { type: Date, required: true }, // Event Date
  location: { type: String, required: true }, // Event Location
  functionType: { type: String, required: true, enum: ["Wedding", "Birthday", "Corporate", "Other"] }, // Event Type
  telephone: { type: String, required: true }, // Telephone
  createdAt: { type: Date, default: Date.now }, // When the event is created
});

// Create the EventDetail model
const EventDetail = mongoose.model("EventDetail", eventDetailSchema);

module.exports = EventDetail;
