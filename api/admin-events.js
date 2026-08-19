import { createClient } from "@libsql/client";

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const result = await db.execute(`
            SELECT *
            FROM button_events
            ORDER BY id DESC
            LIMIT 100
        `);

        return res.status(200).json({
            success: true,
            events: result.rows
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Database error"
        });
    }
}
