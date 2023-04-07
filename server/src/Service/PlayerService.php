<?php

namespace App\Service;

use App\DTO\PlayerDTO;
use App\Entity\Player;
use App\Entity\Team;
use App\Repository\PlayerRepository;
use App\Repository\RoleRepository;
use App\Repository\TeamRepository;
use Doctrine\ORM\EntityManagerInterface;

class PlayerService
{
    private RoleRepository $roleRepository;
    private TeamRepository $teamRepository;
    private PlayerRepository $playerRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(RoleRepository $roleRepository, TeamRepository $teamRepository, PlayerRepository $playerRepository, EntityManagerInterface $entityManager)
    {
        $this->roleRepository = $roleRepository;
        $this->teamRepository = $teamRepository;
        $this->playerRepository = $playerRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * Create a new player using the given PlayerDTO.
     */
    public function createPlayer(PlayerDTO $playerDTO): Player
    {
        $player = new Player();
        $player->setFirstName($playerDTO->getFirstName());
        $player->setLastName($playerDTO->getLastName());
        $player->setForeground($playerDTO->getForeground());
        $player->setBackground($playerDTO->getBackground());

        $team = $this->teamRepository->findOneBy(['name' => $playerDTO->getTeamName()]);
        if (!$team) {
            $team = new Team();
            $team->setName($playerDTO->getTeamName());
            $this->entityManager->persist($team);
        }

        $role = $this->roleRepository->find(2);
        $player->setTeam($team);
        $player->setRole($role);
        $this->entityManager->persist($player);
        $this->entityManager->flush();

        return $player;
    }

    /**
     * Get all players.
     *
     * @return Player[]
     */
    public function getPlayers(): array
    {
        return $this->playerRepository->findAll();
    }

    /**
     * Get a player by ID.
     */
    public function getPlayer(int $playerId): ?Player
    {
        return $this->playerRepository->find($playerId);
    }

    /**
     * Update a player using the given PlayerDTO.
     */
    public function updatePlayer(int $playerId, PlayerDTO $playerDTO): ?Player
    {
        $player = $this->playerRepository->find($playerId);
        $player->setFirstName($playerDTO->getFirstName() ?? $player->getFirstName());
        $player->setLastName($playerDTO->getLastName() ?? $player->getLastName());
        $player->setBackground($playerDTO->getBackground() ?? $player->getBackground());
        $player->setForeground($playerDTO->getForeground() ?? $player->getForeground());

        $this->entityManager->persist($player);
        $this->entityManager->flush();

        return $player;
    }

    /**
     * Delete a player by ID.
     */
    public function deletePlayer(int $playerId): bool
    {
        $player = $this->playerRepository->find($playerId);
        $this->entityManager->remove($player);
        $this->entityManager->flush();
        return true;
    }
}