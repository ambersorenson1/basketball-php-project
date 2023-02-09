<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    #[ORM\Column]
    private ?int $team_id = null;

    #[ORM\Column]
    private ?int $role_id = null;

    #[ORM\OneToOne(inversedBy: 'player', targetEntity: team::class)]
    #[ORM\JoinColumn(name: 'team_id', referencedColumnName: 'team_id')]
    private Team $team;

    #[ORM\OneToOne(targetEntity: role::class)]
    #[ORM\JoinColumn(name: 'role_id', referencedColumnName: 'role_id')]
    private Role $role;

    public function getPlayerId(): ?int
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

    public function getTeamId(): ?int
    {
        return $this->team_id;
    }

    public function setTeamId(int $team_id): self
    {
        $this->team_id = $team_id;

        return $this;
    }

    public function getRoleId(): ?int
    {
        return $this->role_id;
    }

    public function setRoleId(int $role_id): self
    {
        $this->role_id = $role_id;

        return $this;
    }

    /**
     * @return Collection<int, team>
     */
    public function getTeam(): Collection
    {
        return $this->team;
    }

    public function addTeam(team $team): self
    {
        if (!$this->team->contains($team)) {
            $this->team->add($team);
            $team->setPlayer($this);
        }

        return $this;
    }

    public function removeTeam(team $team): self
    {
        if ($this->team->removeElement($team)) {
            // set the owning side to null (unless already changed)
            if ($team->getPlayer() === $this) {
                $team->setPlayer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, role>
     */
    public function getRole(): Collection
    {
        return $this->role;
    }

    public function addRole(role $role): self
    {
        if (!$this->role->contains($role)) {
            $this->role->add($role);
            $role->setPlayer($this);
        }

        return $this;
    }

    public function removeRole(role $role): self
    {
        if ($this->role->removeElement($role)) {
            // set the owning side to null (unless already changed)
            if ($role->getPlayer() === $this) {
                $role->setPlayer(null);
            }
        }

        return $this;
    }
}
