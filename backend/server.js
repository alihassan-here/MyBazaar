const express = require("express");
const env = require("./config/envConfig");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");


const app = express();

//database connection
connectDB();
app.use(cors())

//middleware
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ msg: "welcome to bazaar.com" });
});



//user routes
app.use("/api", userRoutes);

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})