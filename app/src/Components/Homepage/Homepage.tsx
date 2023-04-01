import React from 'react';
import Leaderboard from '../Leaderboard/Leaderboard';
import SelectPlayer from '../SelectPlayer/SelectPlayer';

function Homepage() {
  return (
    <div className="p-8" style={{ height: '100vh', overflowY: 'scroll' }}>
      <SelectPlayer />
      <h1 className="mb-4 text-center text-2xl font-bold">Leaderboard</h1>
      <div className="overflow-y-auto">
        <Leaderboard />
      </div>
    </div>
  );
}

export default Homepage;
