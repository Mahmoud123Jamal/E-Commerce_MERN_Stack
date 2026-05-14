import express from "express";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use("/api/users/", userRoutes);
app.use("/api/products/", productRoutes);
export default app;
