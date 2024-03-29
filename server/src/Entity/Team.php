<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeamRepository::class)]
class Team
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $team_id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    public function getTeamId(): ?int
    {
        return $this->team_id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }


}
