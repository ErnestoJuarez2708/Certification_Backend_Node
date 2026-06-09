import express from "express";
import { errorHandler, responseFormatter } from "./middlewares/formatingMiddleware.js";
import courseRoutes from "./routes/courseRoutes.js";

const PORT = 3000;
const app = express();

app.use(responseFormatter);
app.use("/api/courses", courseRoutes);
app.use(errorHandler);

app.use(express.json());
app.listen(PORT, () => {
    console.log("Server on http://localhost:" + PORT)
})