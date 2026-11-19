# Coy Discover

A Tinder-style profile discovery and matching experience built with Next.js and React.

Coy Discover allows users to explore profiles, like or pass on people, and discover mutual connections through a matching system.

## Features

Profile Discovery:Browse profiles one at a time.
Swipe Interaction: Swipe right to Like and left to Pass.
Like and Pass Buttons: Alternative controls for desktop users.
Mutual Matching: A match is created when both users like each other.
Match Popup: Displays an instant notification when a mutual match occurs.
Matches Page: View all your mutual matches.
Swipe Persistence: Previously swiped profiles do not appear again.
Seeded Profiles: Includes 30 sample profiles for testing.

## Tech Stack

- Next.js
- React.js
- JavaScript
- Framer Motion
- CSS
- Node.js API Routes
- JSON file-based storage

## Project Structure

```text
coy-discover/
├── components/
│   ├── MatchModal.js
│   ├── MatchesList.js
│   ├── ProfileCard.js
│   ├── SwipeDeck.js
│   └── TabBar.js
├── data/
│   └── db.json
├── lib/
│   └── db.js
├── pages/
│   ├── api/
│   │   ├── feed.js
│   │   ├── matches.js
│   │   └── swipe.js
│   ├── _app.js
│   └── index.js
├── styles/
│   └── globals.css
├── jsconfig.json
├── next.config.js
├── package.json
└── README.md
```

 Getting Started
1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL

2. Navigate to the project

cd coy-discover

3. Install dependencies

npm install

4. Start the development server

npm run dev

5. Open the application

Visit:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/feed` | Fetch available profiles |
| POST | `/api/swipe` | Save a Like or Pass action |
| GET | `/api/matches` | Fetch mutual matches |

### Matching Logic

A mutual match is created when:

1. The user likes a profile.
2. The selected profile has `likedYou: true`.
3. The application saves the mutual match in the database.

## Data Storage

The project uses a local JSON file (`data/db.json`) to store sample profiles, swipe actions, and matches.

This is a demonstration implementation. For production, a proper database and user authentication should be added.

## Future Improvements

- User authentication and registration.
- Real-time messaging between matches.
- Database integration.
- Profile creation and editing.
- Location-based profile discovery.
- Notifications for new matches.

## Author

Developed as a profile discovery and matching application using Next.js and React.
