<?php

namespace App\DTO;

class PlayerDTO
{
    public string $firstName;
    public string $lastName;
    public string $foreground;
    public string $background;
   private ?string $teamName = null;

    /**
     * @return string|null
     */
    public function getTeamName(): ?string
    {
        return $this->teamName;
    }

    /**
     * @param string|null $teamName
     */
    public function setTeamName(?string $teamName): void
    {
        $this->teamName = $teamName?: null;
    }


    /**
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->firstName;
    }

    /**
     * @param string $firstName
     */
    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @return string
     */
    public function getForeground(): string
    {
        return $this->foreground;
    }

    /**
     * @param string $foreground
     */
    public function setForeground(string $foreground): void
    {
        $this->foreground = $foreground;
    }

    /**
     * @return string
     */
    public function getBackground(): string
    {
        return $this->background;
    }

    /**
     * @param string $background
     */
    public function setBackground(string $background): void
    {
        $this->background = $background;
    }


}