<?php

namespace App\Service;

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
    public function createPlayer(Request $request): ?Player
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $player = new Player();
        $player->setFirstName($data['first_name']);
        $player->setLastName($data['last_name']);
        $player->setForeground($data['foreground']);
        $player->setBackground($data['background']);
        $team = new Team();
        $team->setName($data['name']);
        $this->entityManager->persist($team);
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
        return $this->playerRepository->find($playerId);
    }

    /**
     * @throws JsonException
     */
    public function updatePlayer(int $playerId, Request $request): ?Player
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $first_name = $data['first_name'] ?? null;
        $last_name = $data['last_name'] ?? null;
        $background = $data['background'] ?? null;
        $foreground = $data['foreground'] ?? null;


        $player = $this->playerRepository->find($playerId);
        if (!$player) {
            return null;
        }
        if ($first_name) {
            $player->setFirstName($first_name);
        }
        if ($last_name) {
            $player->setLastName($last_name);
        }
        if ($background) {
            $player->setBackground($background);
        }
        if ($foreground) {
            $player->setForeground($foreground);
        }
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