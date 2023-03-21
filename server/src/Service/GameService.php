<?php

namespace App\Service;

use App\Entity\Game;
use App\Repository\GameRepository;
//use App\DTO\GameDTO;
use Symfony\Component\HttpFoundation\Request;

class GameService
{
    private GameRepository $gameRepository;

    public function __construct(GameRepository $gameRepository)
    {
        $this->gameRepository = $gameRepository;
    }

//    public function createGame(GameDTO $gameDTO): ?Game
//    {
//        $game = new Game();
//
//        $game->setName($gameDTO->getName());
//
//
//        $this->gameRepository->save($game);
//
//        return $game;
//    }

    public function getGames(): array
    {
        return $this->gameRepository->findAll();
    }

    public function getGame(int $id): ?Game
    {
        $game = $this->gameRepository->find($id);

        if ($game === null) {
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
        $this->gameRepository->remove($game, true);
        return true;
    }
}
