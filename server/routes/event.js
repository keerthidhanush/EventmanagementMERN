const express = require("express");
const router = express.Router(); // Define the router here
const EventDetail = require("../models/eventDetail");

// POST route to add an event
router.post("/", async (req, res) => {
  try {
    console.log("Request received:", req.body);
    const { name, date, location, functionType, telephone } = req.body;

    // Validate required fields
    if (!name || !date || !location || !functionType || !telephone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new event detail entry
    const eventDetail = new EventDetail({
      name,
      date,
      location,
      functionType,
      telephone,
    });

    // Save the event in the database
    await eventDetail.save();
    console.log("Event added successfully:", eventDetail);
    res.status(201).json({ message: "Event added successfully", eventDetail });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Error adding event", error });
  }
});

// GET route to fetch all events
router.get("/", async (req, res) => { // Adjusted to use base route
  try {
    const events = await EventDetail.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});


// PUT route to update an event by ID
router.put("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, date, location, functionType, telephone } = req.body;

    // Validate required fields
    if (!name || !date || !location || !functionType || !telephone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the event by ID and update it
    const updatedEvent = await EventDetail.findByIdAndUpdate(
      eventId,
      {
        name,
        date,
        location,
        functionType,
        telephone,
      },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", eventDetail: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Error updating event", error });
  }
});


// DELETE route to delete an event by ID
router.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await EventDetail.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});

module.exports = router; // Correctly export the router
