const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve your frontend
app.use(express.static(path.join(__dirname, "public")));

// API endpoint
app.post("/api/button", (req, res) => {
    const { button } = req.body;

    const user_ip =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        req.ip ||
        "unknown";

    console.log("Button pressed:", button, "| IP:", user_ip);

    if (!button) {
        return res.status(400).json({
            success: false,
            message: "Button is required"
        });
    }

    res.json({
        success: true,
        button: button
    });
});

// Admin events - local mock (real DB on Vercel)
app.get("/api/admin-events", (req, res) => {
    res.json({ success: true, events: [] });
});

app.delete("/api/admin-events", (req, res) => {
    res.json({ success: true, message: "All records deleted" });
});

// Render provides the PORT environment variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
