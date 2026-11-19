
import { readDB } from "../../lib/db";

export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const db = readDB();

    return res.status(200).json({
      matches: db.matches
    });

  } catch (error) {
    console.error("Matches API error:", error);

    return res.status(500).json({
      error: "Unable to load matches"
    });
  }
}
