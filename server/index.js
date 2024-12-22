import express from "express";
import cors from "cors";

import connectToDatabase from "./config/db.js";

import routes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use("/", routes);

const PORT = process.env.PORT;

connectToDatabase();

app.listen(PORT, () => console.log(`server running on port ${8000}`));
