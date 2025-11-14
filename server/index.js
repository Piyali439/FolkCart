
require("dotenv").config();
const app = exp();
import { connect } from "mongoose";
connect(process.env.MONGODB_URI)

import cors from "cors";
import { urlencoded, json } from "body-parser";
import ef from "express-fileupload";

// CORS
app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:3000"],
  credentials: true,
}));

app.use(ef({ 
    // IMPORTANT: Required to use file.tempFilePath in your controller
    useTempFiles: true, 
    tempFileDir: '/tmp/' 
}));
app.use(urlencoded({ extended: true }));
app.use(json());

// ROUTES (must come before static)
import pr from "./routes/product_r";
app.use("/product", pr);

import ar from "./routes/adminr";
app.use("/admin", ar);

import cr from "./routes/cart_r";
app.use("/cart", cr);

// STATIC — MUST BE LAST
app.use(exp.static("public"));

app.listen(2000, () => {
  console.log("Server running on port 2000");
});
