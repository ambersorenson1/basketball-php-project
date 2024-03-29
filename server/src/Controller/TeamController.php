<?php


namespace App\Controller;

use App\DTO\TeamDTO;
use App\Service\TeamService;
use JsonException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TeamController extends ApiController
{
    private TeamService $teamService;

    public function __construct(TeamService $teamService)
    {
        $this->teamService = $teamService;
    }

    #[Route('/api/teams', methods: ['GET'])]
    public function getCollection(): Response
    {
        $teams = $this->teamService->getAllTeams();
        return $this->json($teams);
    }

    #[Route('/api/teams/{id}', methods: ['GET'])]
    public function getInstance(int $id): Response
    {
        $team = $this->teamService->getTeamById($id);
        return $this->json($team);
    }

    /**
     * Create a new team
     * @throws JsonException
     */
    #[Route('/api/teams', methods: ['POST'])]
    public function createTeam(Request $request): Response
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $teamDTO = new TeamDTO();
        $teamDTO->setName($data['name']);
        $this->teamService->createTeam($teamDTO);
        return $this->json($teamDTO);
    }

    /**
     * Delete a team by ID
     * @param int $teamId
     * @return Response
     */
    #[Route('/api/teams/{team_id}', methods: ['DELETE'])]
    public function deleteTeam(int $teamId): Response
    {
        $team = $this->teamService->getTeamById($teamId);
        $this->teamService->deleteTeam($team);
        return new Response('', Response::HTTP_NO_CONTENT);
    }
}
