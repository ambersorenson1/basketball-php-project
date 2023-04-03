<?php

namespace App\DTO;

class GameDTO
{
  public int $tournamentId;
  public int $teamOneId;
  public int $teamTwoId;
  public int $teamOneScore;

    /**
     * @return int
     */
    public function getTeamOneScore(): int
    {
        return $this->teamOneScore;
    }

    /**
     * @param int $teamOneScore
     */
    public function setTeamOneScore(int $teamOneScore): void
    {
        $this->teamOneScore = $teamOneScore;
    }

    /**
     * @return int
     */
    public function getTeamTwoScore(): int
    {
        return $this->teamTwoScore;
    }

    /**
     * @param int $teamTwoScore
     */
    public function setTeamTwoScore(int $teamTwoScore): void
    {
        $this->teamTwoScore = $teamTwoScore;
    }
  public int $teamTwoScore;

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
