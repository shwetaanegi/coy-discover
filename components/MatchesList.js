
import { useState, useEffect } from "react";

export default function MatchesList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMatches() {
      try {
        const response = await fetch("/api/matches");

        if (!response.ok) {
          throw new Error("Unable to load matches.");
        }

        const data = await response.json();

        setMatches(data.matches || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  if (loading) {
    return (
      <div className="matches-empty">
        Loading your matches...
      </div>
    );
  }

  if (error) {
    return (
      <div className="matches-empty">
        {error}
      </div>
    );
  }

  return (
    <div className="matches-container">

      <div className="matches-heading">
        <h2>Your Matches</h2>
        <p>{matches.length} mutual connections</p>
      </div>

      {matches.length === 0 ? (
        <div className="matches-empty">

          <div className="empty-heart">♡</div>

          <h3>No matches yet</h3>

          <p>
            Keep discovering people.
            Your next connection could be waiting!
          </p>

        </div>
      ) : (
        <div className="matches-grid">

          {matches.map((person) => (
            <div
              className="match-card"
              key={person.profileId}
            >

              <img
                src={person.photo}
                alt={person.name}
              />

              <div className="match-card-info">

                <h3>
                  {person.name}, {person.age}
                </h3>

                <p>{person.city}</p>

                <span>It's a match!</span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
