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

    console.log("Button pressed:", button);

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

// Render provides the PORT environment variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});