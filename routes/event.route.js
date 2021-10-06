const express = require("express");
const router = express.Router();

const eventController = require("../controllers/event.controller");

/**
 * @Path /event
 * List All events
 */
router.get("/", eventController.showAll)

/**
 * @Path /event/add
 * Add new Event
 */
router.post("/add", eventController.createEvent);
/**
 * @Path /event/add
 * Show new Event form
 */
router.get("/add", eventController.showCreateEvent);

/**
 * @Path /event/delete/:id
 * Delete an event given id
 */
router.delete("/delete/:id", eventController.deleteEvent );

module.exports = router;