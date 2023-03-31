<?php

namespace App\Service;

use App\DTO\TeamDTO;
use App\Entity\Team;
use App\Repository\TeamRepository;
use Doctrine\ORM\EntityManagerInterface;


class TeamService
{
    private TeamRepository $teamRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(TeamRepository $teamRepository, EntityManagerInterface $entityManager)
    {
        $this->teamRepository = $teamRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @param int $id
     * @return Team|null
     */
    public function getTeamById(int $id): ?Team
    {
        return $this->teamRepository->find($id);
    }

    /**
     * @return Team[]
     */
    public function getAllTeams(): array
    {
        return $this->teamRepository->findAll();
    }

    /**
     * @param TeamDTO $teamDTO
     * @return void
     */
    public function createTeam(TeamDTO $teamDTO): void
    {
        $team = new Team();
        $team->setName($teamDTO->getName());
        $this->entityManager->persist($team);
    }

    public function deleteTeam(int $teamId): void
    {
        $team = $this->teamRepository->find($teamId);
        $this->teamRepository->remove($team, true);
    }

}
