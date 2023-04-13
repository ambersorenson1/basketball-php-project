import React from 'react';
import { Tournament } from '../../services/DTOs';

type TournamentOptionProps = {
  tournament: Tournament;
};

const TournamentOption: React.FC<TournamentOptionProps> = ({ tournament }) => {
  return (
    <option key={tournament.tournamentId} value={tournament.tournamentId}>
      {tournament.name}
    </option>
  );
};

export default TournamentOption;
