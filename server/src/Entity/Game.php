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

    #[ORM\OneToOne(inversedBy: 'game', targetEntity: team::class)]
    #[ORM\JoinColumn(name: 'team_one_id', referencedColumnName: 'team_id')]
    private Team $team_one;

    #[ORM\OneToOne(inversedBy: 'game', targetEntity: team::class)]
    #[ORM\JoinColumn(name: 'team_two_id', referencedColumnName: 'team_id')]
    private Team $team_two;

    #[ORM\ManyToOne(targetEntity: tournament::class)]
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

//    /**
//     * @return Collection<int, team>
//     */
//    public function getTeamOne(): Collection
//    {
//        return $this->team_one;
//    }

//    public function addTeamOne(team $teamOne): self
//    {
//        if (!$this->team_one->contains($teamOne)) {
//            $this->team_one->add($teamOne);
//            $teamOne->setGame($this);
//        }
//
//        return $this;
//    }
//
//    public function removeTeamOne(team $teamOne): self
//    {
//        if ($this->team_one->removeElement($teamOne)) {
//            // set the owning side to null (unless already changed)
//            if ($teamOne->getGame() === $this) {
//                $teamOne->setGame(null);
//            }
//        }
//
//        return $this;
//    }

//    /**
//     * @return Collection<int, team>
//     */
//    public function getTeamTwo(): Collection
//    {
//        return $this->team_two;
//    }

//    public function addTeamTwo(team $teamTwo): self
//    {
//        if (!$this->team_two->contains($teamTwo)) {
//            $this->team_two->add($teamTwo);
//            $teamTwo->setGame($this);
//        }
//
//        return $this;
//    }
//
//    public function removeTeamTwo(team $teamTwo): self
//    {
//        if ($this->team_two->removeElement($teamTwo)) {
//            // set the owning side to null (unless already changed)
//            if ($teamTwo->getGame() === $this) {
//                $teamTwo->setGame(null);
//            }
//        }
//
//        return $this;
//    }

//    /**
//     * @return Collection<int, tournament>
//     */
//    public function getTournament(): Collection
//    {
//        return $this->tournament;
//    }

//    public function addTournament(tournament $tournament): self
//    {
//        if (!$this->tournament->contains($tournament)) {
//            $this->tournament->add($tournament);
//            $tournament->setGame($this);
//        }
//
//        return $this;
//    }
//
//    public function removeTournament(tournament $tournament): self
//    {
//        if ($this->tournament->removeElement($tournament)) {
//            // set the owning side to null (unless already changed)
//            if ($tournament->getGame() === $this) {
//                $tournament->setGame(null);
//            }
//        }
//
//        return $this;
//    }
//}
