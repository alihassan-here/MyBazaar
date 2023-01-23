const express = require("express");
const env = require("./config/envConfig");
const cors = require("cors");
const { logger, logEvents } = require("./middleware/logger");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/payment");

const app = express();

//database connection
connectDB();
app.use(logger);
app.use(cors());

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "welcome to bazaar.com" });
});

//user routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", productRoutes);
app.use("/api", paymentRoutes);

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
