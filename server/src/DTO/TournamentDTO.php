<?php

namespace App\DTO;

use DateTime;

class TournamentDTO {
    public string $tournamentName;
    private DateTime $startDate;
    private DateTime $endDate;

    public function getName(): string {
        return $this->tournamentName;
    }

    public function setName(string $tournamentName): void {
        $this->tournamentName = $tournamentName;
    }

    public function getStartDate(): DateTime
    {
        return $this->startDate;
    }

    public function setStartDate(DateTime $startDate): void {
        $this->startDate = $startDate;
    }

    public function getEndDate(): DateTime {
        return $this->endDate;
    }

    public function setEndDate(DateTime $endDate): void {
        $this->endDate = $endDate;
    }
}
