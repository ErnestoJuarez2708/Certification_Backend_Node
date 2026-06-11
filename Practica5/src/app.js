import express from "express";
import dotenv from "dotenv";
import { errorHandler, responseFormatter } from "./middlewares/formatingMiddleware.js";
import courseRoutes from "./routes/courseRoutes.js";
import { connectDB } from "./data/mongoConnection.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

await connectDB();

app.use(express.json());
app.use(responseFormatter);
app.use("/api/courses", courseRoutes);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log("Server on http://localhost:" + PORT)
})