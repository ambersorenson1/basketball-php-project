<?php


namespace App\Controller;

use App\DTO\TeamDTO;
use App\Entity\Team;
use App\Service\TeamService;
use http\Client\Request;
use http\Client\Response;
use JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
        return $this->json($teams);
    }

    #[Route('/api/teams/{id}', methods: ['GET'])]
    public function getInstance(int $id): Response
    {
        $team = $this->teamService->getTeamById($id);
        if (!$team) {
            return $this->json(['error' => 'Team not found'], Response::HTTP_NOT_FOUND);
        }
        return $this->json($team);
    }


    /**
     * @throws JsonException
     */
    #[Route('/api/teams', methods: ['POST'])]
    public function createTeam(Request $request): Response
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $teamDTO = new TeamDTO();
        $teamDTO->setName($data['name']);
        $team = $this->teamService->createTeam($teamDTO);
        return $this->json($teamDTO);

    }

    #[Route('/api/teams/{team_id}', methods: ['DELETE'])]
    public function deleteTeam(int $team_id): Response
    {
        $team = $this->teamService->getTeamById($team_id);
        $this->teamService->deleteTeam($team);
        return new Response('', Response::HTTP_NO_CONTENT);
    }

}
