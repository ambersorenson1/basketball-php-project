<?php

namespace App\DTO;

class TeamDTO
{
    private string $name;
    private int $id;

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }
    public function getId(int $id): int
    {
        return $this->id;
    }
}


