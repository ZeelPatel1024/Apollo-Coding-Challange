import request from "supertest";
import mongoose from "mongoose";
import app from "../index.js";
import Vehicle from "../model/vehicleModel.js";
import dotenv from "dotenv";

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

beforeAll(async () => {
    await mongoose.connect(MONGOURL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Vehicle.deleteMany({});
});

describe("Vehicle API", () => {
    const sampleVehicle = {
        manufacturer_name: "Tesla",
        description: "Electric Car",
        horse_power: 400,
        model_name: "Model 3",
        model_year: 2023,
        purchase_price: 45000,
        fuel_type: "Electric",
        vin: "TESTVIN123"
    };

    describe("POST /api/vehicle", () => {
        it("should create a new vehicle", async () => {
            const res = await request(app)
                .post("/api/vehicle")
                .send(sampleVehicle);
            expect(res.statusCode).toBe(201);
            expect(res.body.vin).toBe(sampleVehicle.vin);
        });

        it("should return 400 for invalid JSON", async () => {
            const res = await request(app)
                .post("/api/vehicle")
                .set('Content-Type', 'application/json')
                .send("{ 'vin': 'bad' }"); // Malformed JSON
            expect(res.statusCode).toBe(400);
        });

        it("should return 422 for missing fields", async () => {
            const res = await request(app)
                .post("/api/vehicle")
                .send({});
            expect(res.statusCode).toBe(422);
        });

        it("should return 422 for duplicate VIN", async () => {
            await request(app).post("/api/vehicle").send(sampleVehicle);
            const res = await request(app).post("/api/vehicle").send(sampleVehicle);
            expect(res.statusCode).toBe(422);
        });
    });

    describe("GET /api/vehicle", () => {
        it("should return all vehicles", async () => {
            await request(app).post("/api/vehicle").send(sampleVehicle);
            const res = await request(app).get("/api/vehicle");
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(1);
        });
    });

    describe("GET /api/vehicle/:vin", () => {
        it("should return a vehicle by VIN", async () => {
            await request(app).post("/api/vehicle").send(sampleVehicle);
            const res = await request(app).get(`/api/vehicle/${sampleVehicle.vin}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.vin).toBe(sampleVehicle.vin);
        });

        it("should return a vehicle by VIN (case insensitive)", async () => {
            await request(app).post("/api/vehicle").send(sampleVehicle);
            const res = await request(app).get(`/api/vehicle/${sampleVehicle.vin.toLowerCase()}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.vin).toBe(sampleVehicle.vin);
        });

        it("should return 404 if not found", async () => {
            const res = await request(app).get("/api/vehicle/NONEXISTENT");
            expect(res.statusCode).toBe(404);
        });
    });

    describe("PUT /api/vehicle/:vin", () => {
        it("should update a vehicle", async () => {
            await request(app).post("/api/vehicle").send(sampleVehicle);
            const res = await request(app)
                .put(`/api/vehicle/${sampleVehicle.vin}`)
                .send({ manufacturer_name: "Updated Tesla" });
            expect(res.statusCode).toBe(200);
            expect(res.body.manufacturer_name).toBe("Updated Tesla");
        });

        it("should return 404 if not found", async () => {
            const res = await request(app)
                .put("/api/vehicle/NONEXISTENT")
                .send({ manufacturer_name: "Updated Tesla" });
            expect(res.statusCode).toBe(404);
        });
    });

    describe("DELETE /api/vehicle/:vin", () => {
        it("should delete a vehicle", async () => {
            await request(app).post("/api/vehicle").send(sampleVehicle);
            const res = await request(app).delete(`/api/vehicle/${sampleVehicle.vin}`);
            expect(res.statusCode).toBe(204);

            const check = await request(app).get(`/api/vehicle/${sampleVehicle.vin}`);
            expect(check.statusCode).toBe(404);
        });

        it("should return 404 if not found", async () => {
            const res = await request(app).delete("/api/vehicle/NONEXISTENT");
            expect(res.statusCode).toBe(404);
        });
    });
});
