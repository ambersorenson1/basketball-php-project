<?php

namespace App\Controller;


use App\Service\GameService;
use App\DTO\GameDTO;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends ApiController
{
    private GameService $gameService;

    public function __construct(GameService $gameService)
    {
        $this->gameService = $gameService;
    }

    /**
     * Create a new Game
     * @param Request $request
     * @return Response
     */
    #[Route('/api/games', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $gameDTO = new GameDTO();
        $gameDTO->setTournament($data['tournamentId'] ?? null);
        $gameDTO->setTeamOne($data['teamOneId'] ?? null);
        $gameDTO->setTeamTwo($data['teamTwoId'] ?? null);
        $this->gameService->createGame($gameDTO);

        return $this->json($gameDTO);
    }

    /**
     * Get a game by Id
     * @param int $gameId
     * @return Response
     */
    #[Route('/api/games/{gameId}', methods: ['GET'])]
    public function getInstance(int $gameId): Response
    {
        $game = $this->gameService->getGame($gameId);
        return $this->json($game);
    }

    /**
     * Get all Games
     * @return Response
     */
    #[Route('/api/games', methods: ['GET'])]
    public function getGames(): Response
    {
        return $this->json($this->gameService->getGames());
    }

    /**
     * Delete a Game
     * @param int $gameId
     * @return Response
     */
    #[Route('/api/games/{gameId}', methods: ['DELETE'])]
    public function deleteInstance(int $gameId): Response {
        return $this->json($this->gameService->deleteGame($gameId));
    }
}
