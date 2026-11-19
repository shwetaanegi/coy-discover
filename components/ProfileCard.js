
export default function ProfileCard({ profile }) {
  return (
    <div className="profile-card">

      <img
        src={profile.photo}
        alt={`${profile.name}'s profile`}
        className="profile-photo"
      />

      <div className="profile-overlay">

        <div className="profile-details">

          <h2>
            {profile.name}, {profile.age}
          </h2>

          <p className="profile-city">
            {profile.city}
          </p>

          <p className="profile-bio">
            {profile.bio}
          </p>

          <div className="interests">
            {profile.interests?.map((interest) => (
              <span key={interest}>
                {interest}
              </span>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
