<?php

namespace App\DTO;

use DateTime;

class TournamentDTO {
    public string $tournamentName;
    public DateTime $startDate;
    public DateTime $endDate;

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->tournamentName;
    }

    /**
     * @param string $tournamentName
     */
    public function setName(string $tournamentName): void
    {
        $this->tournamentName = $tournamentName;
    }

    /**
     * @return DateTime
     */
    public function getStartDate(): DateTime
    {
        return $this->startDate;
    }

    /**
     * @param DateTime $startDate
     */
    public function setStartDate(DateTime $startDate): void
    {
        $this->startDate = $startDate;
    }

    /**
     * @return DateTime
     */
    public function getEndDate(): DateTime
    {
        return $this->endDate;
    }

    /**
     * @param DateTime $endDate
     */
    public function setEndDate(DateTime $endDate): void
    {
        $this->endDate = $endDate;
    }

}
