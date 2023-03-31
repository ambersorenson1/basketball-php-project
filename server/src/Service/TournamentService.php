<?php


namespace App\Service;

use App\Entity\Tournament;
use App\Repository\TournamentRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\DTO\TournamentDTO;


class TournamentService
{
    private EntityManagerInterface $entityManager;
    private TournamentRepository $tournamentRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        TournamentRepository   $tournamentRepository
    )
    {
        $this->entityManager = $entityManager;
        $this->tournamentRepository = $tournamentRepository;
    }

    /**
     * Create a new tournament
     */
    public function createTournament(TournamentDTO $tournamentDTO): Tournament
    {
        $tournament = new Tournament();
        $tournament->setName($tournamentDTO->getName());
        $tournament->setStartDate($tournamentDTO->getStartDate());
        $tournament->setEndDate($tournamentDTO->getEndDate());

        $this->entityManager->persist($tournament);
        $this->entityManager->flush();

        return $tournament;
    }

    /**
     * Get a tournament by ID
     * @param int $tournamentId
     * @return Tournament|null
     */
    public function getTournament(int $tournamentId): ?Tournament
    {
        return $this->tournamentRepository->find($tournamentId);
    }

    /**
     * Update a tournament
     */
    public function updateTournament(int $tournamentId, TournamentDTO $tournamentDTO): ?Tournament
    {

        $tournament = $this->tournamentRepository->find($tournamentId);
        $tournament->setName($tournamentDTO->getName() ?? $tournament->getName());
        $tournament->setStartDate($tournamentDTO->getStartDate() ?? $tournament->getStartDate());
        $tournament->setEndDate($tournamentDTO->getEndDate() ?? $tournament->getEndDate());

        $this->entityManager->persist($tournament);
        $this->entityManager->flush();

        return $tournament;
    }

    /**
     * Get all tournaments
     * @return array
     */
    public function getAllTournaments(): array
    {
        return $this->tournamentRepository->findAll();
    }

    /**
     * Delete a tournament
     * @param int $tournamentId
     * @return bool
     */
    public function deleteTournament(int $tournamentId): bool
    {
        $tournament = $this->tournamentRepository->find($tournamentId);
        $this->entityManager->remove($tournament);
        $this->entityManager->flush();
        return true;
    }
}
