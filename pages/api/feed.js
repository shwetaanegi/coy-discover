
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

    // Get IDs of profiles already swiped
    const swipedIds = db.swipes.map(
      (swipe) => swipe.profileId
    );

    // Remove already-swiped profiles
    // Hide likedYou from the frontend
    const feed = db.profiles
      .filter(
        (profile) => !swipedIds.includes(profile.id)
      )
      .map(({ likedYou, ...profile }) => profile);

    return res.status(200).json({
      profiles: feed
    });

  } catch (error) {
    console.error("Feed API error:", error);

    return res.status(500).json({
      error: "Unable to load profiles"
    });
  }
}
