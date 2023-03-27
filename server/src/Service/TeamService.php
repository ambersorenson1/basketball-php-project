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

    public function getTeamById(int $id): ?TeamDTO
    {
        $team = $this->teamRepository->find($id);
        if (!$team) {
            return null;
        }

        return $this->toDTO($team);
    }

    /**
     * @return TeamDTO[]
     */
    public function getAllTeams(): array
    {
        $teams = $this->teamRepository->findAll();
        $teamDTOs = [];

        foreach ($teams as $team) {
            $teamDTOs[] = $this->toDTO($team);
        }

        return $teamDTOs;
    }

    private function toDTO(Team $team): TeamDTO
    {
        $teamDTO = new TeamDTO();
        $teamDTO->setName($team->getName());
        return $teamDTO;
    }
}
