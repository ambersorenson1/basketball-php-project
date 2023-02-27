<?php


namespace App\Controller;

use App\Entity\Team;
use App\Service\TeamService;
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
    public function getCollection(): Response
    {
        $teams = $this->teamService->getAllTeams();
        return new JsonResponse($teams);
    }

    #[Route('/api/teams/{id}', methods: ['GET'])]
    public function getInstance(int $id): Response
    {
        $team = $this->teamService->getTeamById($id);
        if (!$team) {
            return new JsonResponse(['error' => 'Team not found'], Response::HTTP_NOT_FOUND);
        }
        return new JsonResponse($team);
    }

    #[Route('/api/teams', methods: ['POST'])]
    public function createTeam(Request $request): Response
    {
        $name = $request->request->get('name');
        if (!$name) {
            return new JsonResponse(['error' => 'Name is required'], Response::HTTP_BAD_REQUEST);
        }
        $team = $this->teamService->createTeam($name);
        return new JsonResponse($team, Response::HTTP_CREATED);
    }

    #[Route('/api/teams/{team_id}', methods: ['DELETE'])]
    public function deleteTeam(int $team_id): Response
    {
        $team = $this->teamService->getTeamById($team_id);
        $this->teamService->deleteTeam($team);
        return new Response('', Response::HTTP_NO_CONTENT);
    }

}
