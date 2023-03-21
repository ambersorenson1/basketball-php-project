<?php

namespace App\DTO;

class TeamDTO
{
    public string $name;

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }
}
