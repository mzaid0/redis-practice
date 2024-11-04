import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/product-route.js";

import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(productRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
