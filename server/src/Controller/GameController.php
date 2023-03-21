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

//    #[Route('/api/games', methods: ['POST'])]
//    public function createInstance(Request $request): Response
//    {
//        $gameDto = new GameDTO(
//            $request->request->get('name'),
//        );
//
//        $game = $this->gameService->createGame($gameDto);
//        return $this->json($game);
//    }

    #[Route('/api/games', methods: ['GET'])]
    public function getCollection(): Response
    {
        return $this->json($this->gameService->getGames());
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
