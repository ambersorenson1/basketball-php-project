<?php

namespace App\DTO;

class PlayerDTO
{
    private string $firstName;
    private string $lastName;
    private string $foreground;
    private string $background;
    private string $teamName;





public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): void
    {
        $this->firstName = $firstName;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): void
    {
        $this->lastName = $lastName;
    }

    public function getForeground(): ?string
    {
        return $this->foreground;
    }

    public function setForeground(?string $foreground): void
    {
        $this->foreground = $foreground;
    }

    public function getBackground(): ?string
    {
        return $this->background;
    }

    public function setBackground(?string $background): void
    {
        $this->background = $background;
    }

    public function getTeamName(): ?string
    {
        return $this->teamName;
    }

    public function setTeamName(?string $teamName): void
    {
        $this->teamName = $teamName;
    }
}
