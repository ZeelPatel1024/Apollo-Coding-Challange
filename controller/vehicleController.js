import Vehicle from "../model/vehicleModel.js";

export const getAllVehicles = async (req, res) => {
    try {
        // Get all vehicles
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createVehicle = async (req, res) => {
    try {
        const vehicleData = new Vehicle(req.body);
        const savedVehicle = await vehicleData.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        if (error.name === 'ValidationError' || error.code === 11000) {
            return res.status(422).json({ error: "Unprocessable Entity", details: error.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getVehicleByVin = async (req, res) => {
    try {
        const vin = req.params.vin;
        const vehicle = await Vehicle.findOne({ vin: vin.toUpperCase() });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateVehicle = async (req, res) => {
    try {
        const vin = req.params.vin;
        const vehicle = await Vehicle.findOneAndUpdate(
            { vin: vin.toUpperCase() },
            req.body,
            { new: true, runValidators: true }
        );
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        if (error.name === 'ValidationError' || error.code === 11000) {
            return res.status(422).json({ error: "Unprocessable Entity", details: error.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteVehicle = async (req, res) => {
    try {
        const vin = req.params.vin;
        const vehicle = await Vehicle.findOneAndDelete({ vin: vin.toUpperCase() });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};