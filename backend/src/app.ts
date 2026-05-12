import express from "express";
import userRoutes from "./routes/user.route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use("/api/users/", userRoutes);
export default app;
