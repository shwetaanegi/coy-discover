
import { useState, useEffect } from "react";

import MatchesList from "../components/MatchesList";
import MatchModal from "../components/MatchModal";
import TabBar from "../components/TabBar";
import SwipeDeck from "../components/SwipeDeck";

export default function Home() {

  // Navigation state
  const [activeTab, setActiveTab] = useState("discover");

  // Profile data
  const [profiles, setProfiles] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Match popup state
  const [match, setMatch] = useState(null);

  // Fetch profiles when the page loads
  useEffect(() => {

    async function fetchProfiles() {
      try {
        const response = await fetch("/api/feed");

        if (!response.ok) {
          throw new Error("Failed to load profiles");
        }

        const data = await response.json();

        setProfiles(data.profiles);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();

  }, []);

  // Handle Like and Pass
  async function handleSwipe(profileId, action) {

    try {
      const response = await fetch("/api/swipe", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          profileId,
          action
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Swipe failed");
      }

      // Show match popup if mutual like happens
      if (data.match) {
        setMatch(data.match);
      }

      return true;

    } catch (error) {
      console.error("Swipe error:", error);

      alert("Could not save your swipe. Please try again.");

      return false;
    }
  }

  // Main UI
  return (
    <main className="app-shell">

      {/* Header */}
      <header className="app-header">
        <h1>Coy</h1>
        <p>Find your connection.</p>
      </header>

      {/* Main content */}
      <section className="content">

        {/* Home tab */}
        {activeTab === "home" && (
          <div>
            <h2>Welcome to Coy!</h2>
            <p>Discover new people and connections.</p>
          </div>
        )}

        {/* Discover tab */}
        {activeTab === "discover" && (

          <>
            {loading && <p>Loading profiles...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && profiles.length === 0 && (
              <p>No more profiles available!</p>
            )}

            {!loading && !error && profiles.length > 0 && (
              <SwipeDeck
                profiles={profiles}
                onSwipe={handleSwipe}
              />
            )}
          </>

        )}

        {/* Matches tab */}
        {activeTab === "matches" && (
          <MatchesList />
        )}

      </section>

      {/* Bottom navigation */}
      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Match popup */}
      <MatchModal
        match={match}
        onClose={() => setMatch(null)}
      />

    </main>
  );
}
