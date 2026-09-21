import { createClient } from "@libsql/client";

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
    try {
        // Recreate table with full schema
        await db.execute(`
            DROP TABLE IF EXISTS button_events
        `);

        await db.execute(`
            CREATE TABLE button_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_type TEXT NOT NULL,
                button TEXT,
                attempt_number INTEGER,
                session_id TEXT,
                user_agent TEXT,
                referrer TEXT,
                user_ip TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);

        return res.status(200).json({
            success: true,
            message: "Database initialized",
        });

    } catch (error) {
        console.error("Database initialization failed:", error);

        return res.status(500).json({
            success: false,
            message: "Database initialization failed",
        });
    }
}
