<?php


namespace App\Service;

use App\Entity\Tournament;
use App\Repository\TournamentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use http\Client\Request;
use JsonException;
use phpDocumentor\Reflection\Types\Boolean;

class TournamentService {
    private EntityManagerInterface $entityManager;
    private TournamentRepository $tournamentRepository;

    /**
     * @param TournamentRepository $tournamentRepository
     * @param EntityManagerInterface $entityManager
     */

    public function __construct(EntityManagerInterface $entityManager, TournamentRepository $tournamentRepository)
    {
        $this->entityManager = $entityManager;
        $this->tournamentRepository = $tournamentRepository;
    }

    /**
     * @throws JsonException
     */
    public function createTournament(Request $request): Tournament
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $tournament = new Tournament();
        $tournament->setName($data['name']);
        $tournament->setStartDate($data['start_date']);
        $tournament->setEndDate($data['end_date']);
        $this->entityManager->persist($tournament);
        $this->entityManager->flush();
        return $tournament;
    }


    public function getTournament(int $tournamentId): ?Tournament
    {
        return $this->tournamentRepository->find($tournamentId);
    }

    /**
     * @throws Exception
     */
    public function updateTournament(int $tournamentId, Request $request): ?Tournament
    {
        $tournament = $this->tournamentRepository->find($tournamentId);
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $tournament->setName($data['name']);
        $tournament->setStartDate($data['start_date']);
        $tournament->setEndDate($data['end_date']);


        $this->tournamentRepository->save($tournament, true);

        return $tournament;
    }

    /**
     * @throws Exception
     */
    public function deleteTournament(int $tournamentId): Boolean
    {
        $tournament = $this->tournamentRepository->find($tournamentId);

        if (!$tournament) {
            throw new Exception("Tournament not found");
        }

        $this->tournamentRepository->remove($tournament, true);
        return true;
    }


    public function getTournaments(): array
    {
        return $this->tournamentRepository->findAll();
    }
}

