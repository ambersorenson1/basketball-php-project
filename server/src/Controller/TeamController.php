<?php


namespace App\Controller;

use App\DTO\TeamDTO;
use App\Service\TeamService;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TeamController extends AbstractController
{
    private TeamService $teamService;

    public function __construct(TeamService $teamService)
    {
        $this->teamService = $teamService;
    }

    #[Route('/api/teams', methods: ['GET'])]
    public function getCollection(): JsonResponse
    {
        $teams = $this->teamService->getAllTeams();
        return $this->json($teams);
    }

    #[Route('/api/teams/{id}', methods: ['GET'])]
    public function getInstance(int $id): JsonResponse
    {
        $team = $this->teamService->getTeamById($id);

        if (!$team) {
            return $this->json(['message' => 'Team not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        return $this->json($team);
    }

    /**
     * @throws JsonException
     */
    #[Route('/api/teams', methods: ['POST'])]
    public function createTeam(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $teamDTO = new TeamDTO();
        $teamDTO->setName($data['name']);
        $team = $this->teamService->createTeam($teamDTO);
        return $this->json($teamDTO);
    }

    #[Route('/api/teams/{team_id}', methods: ['DELETE'])]
    public function deleteTeam(int $teamId): Response
    {
        $team = $this->teamService->getTeamById($teamId);
        $this->teamService->deleteTeam($team);
        return new Response('', Response::HTTP_NO_CONTENT);
    }
}
