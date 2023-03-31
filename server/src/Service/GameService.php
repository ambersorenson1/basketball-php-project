<?php

namespace App\Service;

use App\DTO\GameDTO;
use App\Entity\Game;
use App\Repository\GameRepository;
use App\Repository\TeamRepository;
use App\Repository\TournamentRepository;
use Doctrine\ORM\EntityManagerInterface;

class GameService
{
    private GameRepository $gameRepository;
    private EntityManagerInterface $entityManager;
    private TeamRepository $teamRepository;
    private TournamentRepository $tournamentRepository;

    public function __construct(GameRepository $gameRepository, EntityManagerInterface $entityManager, TeamRepository $teamRepository, TournamentRepository $tournamentRepository)
    {
        $this->gameRepository = $gameRepository;
        $this->entityManager = $entityManager;
        $this->teamRepository = $teamRepository;
        $this->tournamentRepository = $tournamentRepository;
    }

    /**
     * Get all Games
     * @return array
     */
    public function getGames(): array
    {
        return $this->gameRepository->findAll();
    }

    /**
     * Get a game by ID
     * @param int $id
     * @return Game|null
     */
    public function getGame(int $id): ?Game
    {
       return $this->gameRepository->find($id);
    }

    /**
     * Delete a game by ID
     * @param int $id
     * @return bool
     */
    public function deleteGame(int $id): bool
    {
        $game = $this->gameRepository->find($id);
        $this->gameRepository->remove($game, true);
        return true;
    }

    /**
     * Create a game with the given DTO
     * @param GameDTO $gameDTO
     * @return Game|null
     */
    public function createGame(GameDTO $gameDTO): ?Game
    {
        $tournamentId = $gameDTO->getTournament();
        $tournament = $this->tournamentRepository->find($tournamentId);

        $teamId = $gameDTO->getTeamOne();
        $teamOne = $this->teamRepository->find($teamId);

        $teamId = $gameDTO->getTeamTwo();
        $teamTwo = $this->teamRepository->find($teamId);

        $game = new Game();
        $game->setTournament($tournament);
        $game->setTeamOne($teamOne);
        $game->setTeamTwo($teamTwo);
        $game->setTeamOneScore(0);
        $game->setTeamTwoScore(0);
        $this->entityManager->persist($game);
        $this->entityManager->flush();
        return $game;
    }

}
