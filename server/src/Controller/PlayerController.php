<?php

namespace App\Controller;

use App\Service\PlayerService;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PlayerController extends AbstractController
{
    private PlayerService $playerService;

    public function __construct(PlayerService $playerService)
    {
        $this->playerService = $playerService;
    }

    /**
     * @throws JsonException
     */
    #[Route('/api/players', methods: ['POST'])]
    public function createPlayer(Request $request): Response {
        return $this->json($this->playerService->createPlayer($request));
    }

    #[Route('/api/players', methods: ['GET'])]
    public function getPlayerCollection(): Response {
        return $this->json($this->playerService->getPlayers());
    }

    #[Route('/api/players/{playerId}', methods: ['GET'])]
    public function getPlayer(int $playerId): Response {
        return $this->json($this->playerService->getPlayer($playerId));
    }

    /**
     * @throws JsonException
     */
    #[Route('/api/players/{playerId}', methods: ['PATCH', 'PUT'])]
    public function updatePlayer(int $playerId, Request $request): Response {
        return $this->json($this->playerService->updatePlayer($playerId, $request));
    }

    #[Route('/api/players/{playerId}', methods: ['DELETE'])]
    public function deletePlayer(int $playerId): Response {
        return $this->json($this->playerService->deletePlayer($playerId));
    }
}