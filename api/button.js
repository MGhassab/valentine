import { createClient } from "@libsql/client";

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        const {
            event_type,
            button,
            attempt_number,
            session_id,
            user_agent,
            referrer
        } = req.body;

        const user_ip =
            req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.headers["x-real-ip"] ||
            req.socket?.remoteAddress ||
            req.ip ||
            null;

        await db.execute({
            sql: `
                INSERT INTO button_events (
                    event_type,
                    button,
                    attempt_number,
                    session_id,
                    user_agent,
                    referrer,
                    user_ip
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `,

            args: [
                event_type,
                button ?? null,
                attempt_number ?? null,
                session_id ?? null,
                user_agent ?? null,
                referrer ?? null,
                user_ip
            ]
        });

        return res.status(200).json({
            success: true
        });

    } catch (error) {

        console.error("Database error:", error);

        return res.status(500).json({
            success: false,
            message: "Database error"
        });
    }
}
