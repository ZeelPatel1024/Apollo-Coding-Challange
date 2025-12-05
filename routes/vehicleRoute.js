import express from "express";
import { getAllVehicles, createVehicle, getVehicleByVin, updateVehicle, deleteVehicle } from "../controller/vehicleController.js";

const route = express.Router();

// Get all vehicles api
route.get("/vehicle", getAllVehicles);

// Create vehicle api
route.post("/vehicle", createVehicle);

// Get vehicle by id api
route.get("/vehicle/:vin", getVehicleByVin);

// Update vehicle api
route.put("/vehicle/:vin", updateVehicle);

// Delete vehicle api
route.delete("/vehicle/:vin", deleteVehicle);

export default route;
