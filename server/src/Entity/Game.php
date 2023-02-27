<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\Integer;

#[ORM\Entity(repositoryClass: GameRepository::class)]
class Game
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $game_id = null;

    #[ORM\Column]
    private ?int $team_one_id = null;

    #[ORM\Column]
    private ?int $team_two_id = null;

    #[ORM\Column]
    private ?int $team_one_score = null;

    #[ORM\Column]
    private ?int $team_two_score = null;

    #[ORM\Column]
    private ?int $tournament_id = null;

    #[ORM\OneToOne(targetEntity: Team::class)]
    #[ORM\JoinColumn(name: 'team_one_id', referencedColumnName: 'team_id')]
    private Team $team_one;

    #[ORM\OneToOne(targetEntity: Team::class)]
    #[ORM\JoinColumn(name: 'team_two_id', referencedColumnName: 'team_id')]
    private Team $team_two;

    #[ORM\ManyToOne(targetEntity: Tournament::class)]
    #[ORM\JoinColumn(name: 'tournament_id', referencedColumnName: 'tournament_id')]
    private Tournament $tournament;

    public function getGameId(): ?int
    {
        return $this->game_id;
    }

    public function getTeamOneId(): ?int
    {
        return $this->team_one_id;
    }

    public function setTeamOneId(int $team_one_id): self
    {
        $this->team_one_id = $team_one_id;

        return $this;
    }

    public function getTeamTwoId(): ?int
    {
        return $this->team_two_id;
    }

    public function setTeamTwoId(int $team_two_id): self
    {
        $this->team_two_id = $team_two_id;

        return $this;
    }

    public function getTeamOneScore(): ?int
    {
        return $this->team_one_score;
    }

    public function setTeamOneScore(int $team_one_score): self
    {
        $this->team_one_score = $team_one_score;

        return $this;
    }

    public function getTeamTwoScore(): ?int
    {
        return $this->team_two_score;
    }

    public function setTeamTwoScore(int $team_two_score): self
    {
        $this->team_two_score = $team_two_score;

        return $this;
    }

    public function getTournamentId(): ?int
    {
        return $this->tournament_id;
    }

    public function setTournamentId(int $tournament_id): self
    {
        $this->tournament_id = $tournament_id;

        return $this;
    }
}

