<?php

namespace App\DTO;

class TournamentDTO {
    public string $tournamentName;
    public string $startDate;
    public string $endDate;

    public function getName(): string {
        return $this->tournamentName;
    }

    public function setName(string $tournamentName): void {
        $this->tournamentName = $tournamentName;
    }

    public function getStartDate(): string {
        return $this->startDate;
    }

    public function setStartDate(string $startDate): void {
        $this->startDate = $startDate;
    }

    public function getEndDate(): string {
        return $this->endDate;
    }

    public function setEndDate(string $endDate): void {
        $this->endDate = $endDate;
    }
}
