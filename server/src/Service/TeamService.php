<?php

namespace App\Service;

use App\Entity\Team;
use App\Repository\TeamRepository;

class TeamService
{
    private TeamRepository $teamRepository;

    public function __construct(TeamRepository $teamRepository)
    {
        $this->teamRepository = $teamRepository;
    }

    public function createTeam(string $name): Team
    {
        $team = new Team();
        $team->setName($name);
        $this->teamRepository->save($team, true);
        return $team;
    }

    public function deleteTeam(Team $team): void
    {
        $this->teamRepository->remove($team, true);
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
