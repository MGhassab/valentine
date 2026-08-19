import { createClient } from "@libsql/client";

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS button_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_type TEXT NOT NULL,
                button TEXT,
                attempt_number INTEGER,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);

        return res.status(200).json({
            success: true,
            message: "Database initialized",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Database initialization failed",
        });
    }
}
