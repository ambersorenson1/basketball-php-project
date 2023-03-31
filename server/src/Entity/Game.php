<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GameRepository::class)]
class Game
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $game_id = null;

    #[ORM\OneToOne(targetEntity: Team::class)]
    #[ORM\JoinColumn(name: 'team_one_id', referencedColumnName: 'team_id')]
    private Team $team_one;

    #[ORM\OneToOne(targetEntity: Team::class)]
    #[ORM\JoinColumn(name: 'team_two_id', referencedColumnName: 'team_id')]
    private Team $team_two;

    #[ORM\Column]
    private ?int $team_one_score = null;

    #[ORM\Column]
    private ?int $team_two_score = null;

    #[ORM\ManyToOne(targetEntity: Tournament::class)]
    #[ORM\JoinColumn(name: 'tournament_id', referencedColumnName: 'tournament_id')]
    private Tournament $tournament;

    public function getGameId(): ?int
    {
        return $this->game_id;
    }

    public function getTeamOne(): Team
    {
        return $this->team_one;
    }

    public function setTeamOne(Team $team_one): self
    {
        $this->team_one = $team_one;

        return $this;
    }

    public function getTeamTwo(): Team
    {
        return $this->team_two;
    }

    public function setTeamTwo(Team $team_two): self
    {
        $this->team_two = $team_two;

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

    public function getTournament(): Tournament
    {
        return $this->tournament;
    }

    public function setTournament(Tournament $tournament): self
    {
        $this->tournament = $tournament;

        return $this;
    }
}