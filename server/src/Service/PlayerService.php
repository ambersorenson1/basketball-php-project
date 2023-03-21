<?php

namespace App\Service;

use App\DTO\PlayerDTO;
use App\DTO\TeamDTO;
use App\Entity\Player;
use App\Entity\Team;
use App\Repository\PlayerRepository;
use App\Repository\RoleRepository;
use App\Repository\TeamRepository;
use Doctrine\ORM\EntityManagerInterface;
use JsonException;
use Symfony\Component\HttpFoundation\Request;

class PlayerService
{

    private RoleRepository $roleRepository;
    private TeamRepository $teamRepository;
    private PlayerRepository $playerRepository;
    private EntityManagerInterface $entityManager;


    /**
     * @param RoleRepository $roleRepository
     * @param TeamRepository $teamRepository
     * @param PlayerRepository $playerRepository
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(RoleRepository $roleRepository, TeamRepository $teamRepository, PlayerRepository $playerRepository, EntityManagerInterface $entityManager)
    {
        $this->roleRepository = $roleRepository;
        $this->teamRepository = $teamRepository;
        $this->playerRepository = $playerRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @throws JsonException
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
     * @return Player[]
     */
    public function getPlayers(): array
    {
        return $this->playerRepository->findAll();
    }

    public function getPlayer(int $playerId): ?Player
    {
        $player = $this->playerRepository->find($playerId);

        if ($player === null) {
            return null;
        }

        return $player;
    }


    public function updatePlayer(int $playerId, PlayerDTO $playerDTO): ?Player
    {
        $player = $this->playerRepository->find($playerId);
        if (!$player) {
            return null;
        }

        $player->setFirstName($playerDTO->getFirstName() ?? $player->getFirstName());
        $player->setLastName($playerDTO->getLastName() ?? $player->getLastName());
        $player->setBackground($playerDTO->getBackground() ?? $player->getBackground());
        $player->setForeground($playerDTO->getForeground() ?? $player->getForeground());

        $this->playerRepository->save($player, true);
        return $player;
    }

    public function deletePlayer(int $playerId): bool
    {
        $player = $this->playerRepository->find($playerId);
        if (!$player) {
            return false;
        }
        $this->playerRepository->remove($player, true);
        return true;
    }


}
