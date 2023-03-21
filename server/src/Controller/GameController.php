<?php

namespace App\Controller;

use App\Service\GameService;
use App\DTO\GameDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    private GameService $gameService;

    public function __construct(GameService $gameService)
    {
        $this->gameService = $gameService;
    }

    #[Route('/api/games', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $tournamentId = $data['tournament_id'] ?? null;
        $teamOneId = $data['team_one_id'] ?? null;
        $teamTwoId = $data['team_two_id'] ?? null;
        $game = $this->gameService->createGame($tournamentId, $teamOneId, $teamTwoId);
        if ($game === null) {
            return $this->json(['error' => 'Unable to create a game with the provided data'], Response::HTTP_BAD_REQUEST);
        }

        return $this->json($game, Response::HTTP_CREATED);
    }


    #[Route('/api/games/{gameId}', methods: ['GET'])]
    public function getInstance(int $gameId): Response
    {
        $game = $this->gameService->getGame($gameId);
        return $this->json($game);
    }

    #[Route('/api/games/{gameId}', methods: ['DELETE'])]
    public function deleteInstance(int $gameId): Response {
        return $this->json($this->gameService->deleteGame($gameId));
    }
}
