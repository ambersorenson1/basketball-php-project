<?php

namespace App\Service;

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

    public function createGame(int $tournamentId, int $teamOneId, int $teamTwoId): ?Game
    {
        $tournament = $this->tournamentRepository->find($tournamentId);
        $teamOne = $this->teamRepository->find($teamOneId);
        $teamTwo = $this->teamRepository->find($teamTwoId);
        if (!$tournament) {
        error_log('Tournament not found with id: ' . $tournamentId);
        }

        if (!$teamOne) {
        error_log('Team one not found with id: ' . $teamOneId);
        }

        if (!$teamTwo) {
        error_log('Team two not found with id: ' . $teamTwoId);

        }

        $game = new Game();
        $game->setTournament($tournament);
        $game->setTeamOne($teamOne);
        $game->setTeamTwo($teamTwo);
        $game->setTeamOneScore(0);
        $game->setTeamTwoScore(0);
        $this->gameRepository->save($game);
        $this->entityManager->persist($game);
        $this->entityManager->flush();
        return $game;
    }

}
