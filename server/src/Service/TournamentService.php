<?php

namespace App\Service;

use App\Entity\Tournament;
use App\Repository\TournamentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use JsonException;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Component\HttpFoundation\Request;
use App\DTO\TournamentDTO;
use DateTime;


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
        $tournament->setName($data['tournamentName']);

// Create a DateTime object from the date string
        $dateString = $data['startDate'];
//        $dateString2 = $data['endDate'];
        $dateFormat = 'm-d-Y';
        $dateObject = DateTime::createFromFormat($dateFormat, $dateString);

// Set the start and end dates of the tournament
        $tournament->setStartDate($dateObject);
        $tournament->setEndDate($dateObject);

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

        $tournamentDTO = new TournamentDTO();
        $tournamentDTO->setName($data['name']);
        $tournamentDTO->setStartDate($data['start_date']);
        $tournamentDTO->setEndDate($data['end_date']);

        $tournament->setName($tournamentDTO->getName());
        $tournament->setStartDate($tournamentDTO->getStartDate());
        $tournament->setEndDate($tournamentDTO->getEndDate());

        $this->tournamentRepository->save($tournament);

        return $tournament;
    }

    /**
     * @throws Exception
     */
    public function deleteTournament(int $tournamentId): bool
    {
        $tournament = $this->tournamentRepository->find($tournamentId);

        if (!$tournament) {
            throw new Exception("Tournament not found");
        }

        $this->tournamentRepository->remove($tournament);
        return true;
    }


    public function getTournaments(): array
    {
        return $this->tournamentRepository->findAll();
    }
}
