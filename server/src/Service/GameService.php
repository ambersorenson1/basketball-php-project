<?php

namespace App\Service;

use App\Entity\Game;
use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\HttpFoundation\Request;

class GameService
{
    private GameRepository $gameRepository;

    public function __construct(GameRepository $gameRepository)
    {
        $this->gameRepository = $gameRepository;
    }

    public function createGame(Request $request): ?Game
    {
        // Parse request data and create a new Game entity
//        $games = new ArrayCollection();
        $game = new Game();
            // Save the new Game entity to the database
        $this->gameRepository->save($game);
        return $game;
    }

    public function getGames(): array
    {
        // Return all games from the repository
        return $this->gameRepository->findAll();
    }

    public function getGame(int $id): ?Game
    {
        // Return a single game by ID from the repository
        $game = $this->gameRepository->find($id);

        if (!$game) {
            return null;
        }

        return $game;
    }

    public function deleteGame(int $id): bool
    {
        // Find the Game entity by ID
        $game = $this->gameRepository->find($id);
        if (!$game) {
            return false;
        }

        // Remove the Game entity from the repository
        try {
            $this->gameRepository->remove($game);
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }
}