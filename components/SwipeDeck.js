
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate
} from "framer-motion";

import ProfileCard from "./ProfileCard";

export default function SwipeDeck({ profiles, onSwipe }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const x = useMotionValue(0);

  const rotate = useTransform(x, [-250, 250], [-20, 20]);

  const likeOpacity = useTransform(x, [0, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, 0], [1, 0]);

  const currentProfile = profiles[currentIndex];

  async function handleSwipe(action) {
    if (!currentProfile || isSwiping) return;

    setIsSwiping(true);

    const direction = action === "like" ? 1 : -1;

    // Animate the card out of the screen
    await animate(x, direction * 500, {
      duration: 0.25
    });

    // Save the swipe in the database
    const success = await onSwipe(currentProfile.id, action);

    if (success) {
      setCurrentIndex((previousIndex) => previousIndex + 1);
    }

    // Reset position for the next profile
    x.set(0);
    setIsSwiping(false);
  }

  function handleDragEnd(event, info) {
    if (isSwiping) return;

    if (info.offset.x > 120) {
      handleSwipe("like");
    } else if (info.offset.x < -120) {
      handleSwipe("pass");
    } else {
      animate(x, 0, { duration: 0.2 });
    }
  }

  if (!currentProfile) {
    return (
      <div className="no-profiles">
        <h2>You've seen everyone!</h2>
        <p>Come back later to discover more people.</p>
      </div>
    );
  }

  return (
    <div className="swipe-container">

      <motion.div
        className="swipe-card"
        style={{
          x,
          rotate
        }}
        drag={isSwiping ? false : "x"}
        dragConstraints={{
          left: 0,
          right: 0
        }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 1.02 }}
      >

        {/* LIKE indicator */}
        <motion.div
          className="swipe-label like-label"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </motion.div>

        {/* PASS indicator */}
        <motion.div
          className="swipe-label pass-label"
          style={{ opacity: passOpacity }}
        >
          PASS
        </motion.div>

        <ProfileCard profile={currentProfile} />

      </motion.div>

      {/* Like and Pass buttons */}
      <div className="swipe-buttons">

        <button
          type="button"
          className="pass-button"
          disabled={isSwiping}
          onClick={() => handleSwipe("pass")}
          aria-label="Pass"
        >
          ✕
        </button>

        <button
          type="button"
          className="like-button"
          disabled={isSwiping}
          onClick={() => handleSwipe("like")}
          aria-label="Like"
        >
          ♥
        </button>

      </div>

    </div>
  );
}
