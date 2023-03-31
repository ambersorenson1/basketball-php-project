<?php


namespace App\Service;

use App\Entity\Tournament;
use App\Repository\TournamentRepository;
use Doctrine\ORM\EntityManagerInterface;
use JsonException;
use Symfony\Component\HttpFoundation\Request;
use App\DTO\TournamentDTO;
use DateTime;

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
     * @throws JsonException
     */
    public function updateTournament(int $tournamentId, Request $request): ?Tournament
    {
        $tournament = $this->tournamentRepository->find($tournamentId);
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);

        $tournamentDTO = new TournamentDTO();
        $tournamentDTO->setName($data['name']);
        $tournamentDTO->setStartDate(DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $data['start_date']));
        $tournamentDTO->setEndDate(DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $data['end_date']));

        $tournament->setName($tournamentDTO->getName());
        $tournament->setStartDate($tournamentDTO->getStartDate());
        $tournament->setEndDate($tournamentDTO->getEndDate());

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
