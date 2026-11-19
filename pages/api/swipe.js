
import { readDB, writeDB } from "../../lib/db";

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { profileId, action } = req.body;

    // Validate incoming data
    if (
      !profileId ||
      !["like", "pass"].includes(action)
    ) {
      return res.status(400).json({
        error: "Invalid swipe data"
      });
    }

    const db = readDB();

    // Find the selected profile
    const profile = db.profiles.find(
      (person) => person.id === profileId
    );

    if (!profile) {
      return res.status(404).json({
        error: "Profile not found"
      });
    }

    // Check whether this profile was already swiped
    const alreadySwiped = db.swipes.some(
      (swipe) => swipe.profileId === profileId
    );

    if (alreadySwiped) {
      return res.status(200).json({
        success: true,
        alreadySwiped: true,
        match: null
      });
    }

    // Save the swipe
    db.swipes.push({
      profileId,
      action,
      createdAt: new Date().toISOString()
    });

    let match = null;

    // Check for a mutual Like
    if (action === "like" && profile.likedYou === true) {
      match = {
        profileId: profile.id,
        name: profile.name,
        age: profile.age,
        photo: profile.photo,
        city: profile.city,
        matchedAt: new Date().toISOString()
      };

      // Save the match
      db.matches.push(match);
    }

    // Write updated data to db.json
    writeDB(db);

    return res.status(200).json({
      success: true,
      match
    });

  } catch (error) {
    console.error("Swipe API error:", error);

    return res.status(500).json({
      error: "Unable to save swipe"
    });
  }
}
