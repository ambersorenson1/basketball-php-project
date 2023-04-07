import React from 'react';
import Leaderboard from '../Leaderboard/Leaderboard';
import SelectPlayer from '../SelectPlayer/SelectPlayer';
import ListAllTournaments from '../ListAllTournaments/ListAllTournaments';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div
      className="flex flex-col p-8 lg:flex-row"
      style={{ height: '100vh', overflowY: 'scroll' }}
    >
      <div className="w-full lg:w-1/2 lg:pr-4">
        <p className="mb-4 text-center">
          Please either select a player from the dropdown below or visit the{' '}
          <Link
            to="/profile-page"
            className="text-blue-500 hover:text-blue-700"
          >
            Profile Page
          </Link>{' '}
          to create a new player!
        </p>

        <SelectPlayer />
        <h1 className="mb-4 text-center text-2xl font-bold">Leaderboard</h1>
        <div className="overflow-y-auto">
          <Leaderboard />
        </div>
      </div>
      <div className="lg:w-1/2 lg:pl-4">
        <h1 className="mb-4 text-center text-2xl font-bold">All Tournaments</h1>
        <div className="overflow-y-auto">
          <ListAllTournaments />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
