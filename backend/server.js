require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const applicationRoutes = require("./routes/applicationRoutes");



const app = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");

const { protect } = require("./middleware/authMiddleware");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("ApplyTrack API is running...");
});

app.use("/api/applications", protect, applicationRoutes);
app.use("/api/auth", authRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();