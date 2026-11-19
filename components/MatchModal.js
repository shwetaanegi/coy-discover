
export default function MatchModal({ match, onClose }) {
  if (!match) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="match-modal">

        <div className="match-heart">♥</div>

        <h1>It's a Match!</h1>

        <p>
          You and {match.name} liked each other.
        </p>

        <div className="match-photo-wrapper">
          <img
            src={match.photo}
            alt={match.name}
            className="match-photo"
          />
        </div>

        <h2>{match.name}, {match.age}</h2>

        <p className="match-city">{match.city}</p>

        <button
          type="button"
          onClick={onClose}
          className="match-continue-button"
        >
          Continue Discovering
        </button>

      </div>
    </div>
  );
}
