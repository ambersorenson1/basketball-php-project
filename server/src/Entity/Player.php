<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: PlayerRepository::class)]
class Player
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $player_id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $first_name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $last_name = null;

    #[ORM\Column(length: 255)]
    private ?string $foreground = null;

    #[ORM\Column(length: 255)]
    private ?string $background = null;

    #[ORM\OneToOne(targetEntity: Team::class, cascade: ["persist"])]
    #[ORM\JoinColumn(name: 'team_id', referencedColumnName: 'team_id')]
    private ?Team $team = null;

    #[ORM\ManyToOne(cascade: ["persist"])]
    #[ORM\JoinColumn(name: 'role_id', referencedColumnName: "role_id", nullable: false)]
    private ?Role $role = null;


    public function getId(): ?int
    {
        return $this->player_id;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(string $first_name): self
    {
        $this->first_name = $first_name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(string $last_name): self
    {
        $this->last_name = $last_name;

        return $this;
    }

    public function getForeground(): ?string
    {
        return $this->foreground;
    }

    public function setForeground(string $foreground): self
    {
        $this->foreground = $foreground;

        return $this;
    }

    public function getBackground(): ?string
    {
        return $this->background;
    }

    public function setBackground(string $background): self
    {
        $this->background = $background;

        return $this;
    }

    public function getTeam(): ?Team
    {
        return $this->team;
    }

    public function setTeam(Team $team = null): self
    {
        $this->team = $team;

        return $this;
    }

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(Role $role = null): self
    {
        $this->role = $role;

        return $this;
    }

}