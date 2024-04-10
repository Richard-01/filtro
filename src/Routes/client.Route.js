const express = require("express");
const router = express.Router();
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientByEmail,
  getClientsByGender,
  getClientsByAge,
} = require("../Controllers/client.Controller");
const authenticateToken = require("../middleware/auth");

router
  .get("/", authenticateToken, getAllClients)
  .get("/:id", authenticateToken, getClientById)
  .get("/email/:email", authenticateToken, getClientByEmail)
  .get("/gender/:gender", authenticateToken, getClientsByGender)
  .get("/age/:age", authenticateToken, getClientsByAge)
  .post("/", createClient)
  .put("/:id", authenticateToken, updateClient)
  .delete("/:id", authenticateToken, deleteClient);

module.exports = router;
