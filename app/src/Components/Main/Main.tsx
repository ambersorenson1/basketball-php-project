import React from 'react';

interface Team {
  name: string;
  score: number;
}

interface Game {
  homeTeam: Team;
  awayTeam: Team;
  date: Date;
}

const leaderboard: Team[] = [
  { name: 'Team A', score: 10 },
  { name: 'Team B', score: 8 },
  { name: 'Team C', score: 5 },
  { name: 'Team D', score: 2 },
];

const upcomingGames: Game[] = [
  {
    homeTeam: { name: 'Team A', score: 0 },
    awayTeam: { name: 'Team B', score: 0 },
    date: new Date('2023-03-20T18:00:00Z'),
  },
  {
    homeTeam: { name: 'Team C', score: 0 },
    awayTeam: { name: 'Team D', score: 0 },
    date: new Date('2023-03-22T20:00:00Z'),
  },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function MainPage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Leaderboard</h1>
      <ul className="mb-8">
        {leaderboard.map(team => (
          <li
            className="flex items-center justify-between border-b border-gray-300 py-2"
            key={team.name}
          >
            <span className="text-lg">{team.name}</span>
            <span className="text-lg font-bold">{team.score}</span>
          </li>
        ))}
      </ul>
      <h1 className="mb-4 text-2xl font-bold">Upcoming Games</h1>
      <ul>
        {upcomingGames.map(game => (
          <li
            className="flex items-center justify-between border-b border-gray-300 py-2"
            key={`${game.homeTeam.name}-${game.date.toISOString()}`}
          >
            <span className="text-lg">
              {game.homeTeam.name} vs {game.awayTeam.name}
            </span>
            <span className="text-lg">{formatTime(game.date)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
