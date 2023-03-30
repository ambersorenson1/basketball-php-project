<?php

namespace App\Service;

use App\DTO\TeamDTO;
use App\Entity\Team;
use App\Repository\TeamRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class TeamService
{
    private TeamRepository $teamRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(TeamRepository $teamRepository, EntityManagerInterface $entityManager)
    {
        $this->teamRepository = $teamRepository;
        $this->entityManager = $entityManager;
    }

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


}
