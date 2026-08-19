import { createClient } from "@libsql/client";

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const {
            event_type,
            button,
            attempt_number
        } = req.body;

        await db.execute({
            sql: `
                INSERT INTO button_events
                (event_type, button, attempt_number)
                VALUES (?, ?, ?)
            `,
            args: [
                event_type,
                button,
                attempt_number ?? null,
            ],
        });

        return res.status(200).json({
            success: true,
        });

    } catch (error) {
        console.error("Database error:", error);

        return res.status(500).json({
            success: false,
            message: "Database error",
        });
    }
}
