import express from "express";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//STATIC FILES
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads/products")),
);

app.use(cors());
app.use("/api/users/", userRoutes);
app.use("/api/products/", productRoutes);
export default app;
