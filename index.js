import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"

const app = express();

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ error: "Bad Request: Invalid JSON" });
    }
    next();
});
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

import route from "./routes/vehicleRoute.js";

// Use the default route http://localhost:8000/api
app.use("/api", route);

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGOURL).then(() => {
        console.log("Database connected successful!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
        .catch((error) => console.log(error));
}

export default app;