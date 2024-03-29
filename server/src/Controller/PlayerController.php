<?php

namespace App\Controller;

use App\DTO\PlayerDTO;
use App\Service\PlayerService;
use JsonException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PlayerController extends ApiController
{
    private PlayerService $playerService;

    public function __construct(PlayerService $playerService)
    {
        $this->playerService = $playerService;
    }

    /**
     * Create a new player.
     *
     * @throws JsonException
     */
    #[Route('/api/players', methods: ['POST'])]
    public function createPlayer(Request $request): Response
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);

        $playerDTO = new PlayerDTO();
        $playerDTO->setFirstName($data['firstName']);
        $playerDTO->setLastName($data['lastName']);
        $playerDTO->setForeground($data['foreground']);
        $playerDTO->setBackground($data['background']);
        $playerDTO->setTeamName($data['team']['name']);

        $this->playerService->createPlayer($playerDTO);

        return $this->json($playerDTO);
    }

    /**
     * Get all players.
     */
    #[Route('/api/players', methods: ['GET'])]
    public function getPlayerCollection(): Response
    {
        return $this->json($this->playerService->getPlayers());
    }

    /**
     * Get a player by ID.
     */
    #[Route('/api/players/{playerId}', methods: ['GET'])]
    public function getPlayer(int $playerId): Response
    {
        return $this->json($this->playerService->getPlayer($playerId));
    }

    /**
     * Update a player.
     *
     * @throws JsonException
     */
    #[Route('/api/players/{playerId}', methods: ['PUT', 'PATCH'])]
    public function updatePlayer(int $playerId, Request $request): Response
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $playerDTO = new PlayerDTO();
        $playerDTO->setFirstName($data['firstName'] ?? null);
        $playerDTO->setLastName($data['lastName'] ?? null);
        $playerDTO->setForeground($data['foreground'] ?? null);
        $playerDTO->setBackground($data['background'] ?? null);
        $playerDTO->setTeamName($data['teamName']);

        $this->playerService->updatePlayer($playerId, $playerDTO);

        return $this->json($this->playerService->getPlayer($playerId));
    }


    /**
     * Delete a player by ID.
     */
    #[Route('/api/players/{playerId}', methods: ['DELETE'])]
    public function deletePlayer(int $playerId): Response
    {
        return $this->json($this->playerService->deletePlayer($playerId));
    }
}