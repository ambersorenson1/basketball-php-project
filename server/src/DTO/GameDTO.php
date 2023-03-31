<?php

namespace App\DTO;

class GameDTO
{
  public int $tournamentId;
  public int $teamOneId;
  public int $teamTwoId;

    /**
     * @return string
     */
    public function getTournament(): string
    {
        return $this->tournamentId;
    }

    /**
     * @param string $tournamentId
     */
    public function setTournament(string $tournamentId): void
    {
        $this->tournamentId = $tournamentId;
    }

    /**
     * @return string
     */
    public function getTeamOne(): string
    {
        return $this->teamOneId;
    }

    /**
     * @param string $teamOneId
     */
    public function setTeamOne(string $teamOneId): void
    {
        $this->teamOneId = $teamOneId;
    }

    /**
     * @return string
     */
    public function getTeamTwo(): string
    {
        return $this->teamTwoId;
    }

    /**
     * @param string $teamTwoId
     */
    public function setTeamTwo(string $teamTwoId): void
    {
        $this->teamTwoId = $teamTwoId;
    }



}
