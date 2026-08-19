const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/button", (req, res) => {
    const { button } = req.body;

    console.log("Button pressed:", button);

    if (button !== "yes" && button !== "no") {
        return res.status(400).json({
            success: false,
            message: "Invalid button"
        });
    }

    // Later:
    // save to database here

    res.json({
        success: true,
        button
    });
});

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
