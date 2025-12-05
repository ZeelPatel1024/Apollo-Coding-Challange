import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    vin: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    manufacturer_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    horse_power: {
        type: Number,
        required: true
    },
    model_name: {
        type: String,
        required: true
    },
    model_year: {
        type: Number,
        required: true
    },
    purchase_price: {
        type: Number,
        required: true
    },
    fuel_type: {
        type: String,
        required: true
    }
})

export default mongoose.model("Vehicle", vehicleSchema);
