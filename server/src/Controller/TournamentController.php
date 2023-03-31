<?php


namespace App\Controller;

use App\DTO\TournamentDTO;
use App\Service\TournamentService;
use DateTime;
use JsonException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TournamentController extends ApiController
{
    private TournamentService $tournamentService;

    public function __construct(TournamentService $tournamentService)
    {
        $this->tournamentService = $tournamentService;
    }

    /**
     * Create a tournament
     * @throws JsonException
     */
    #[Route('/api/tournaments', methods: ['POST'])]
    public function createTournamentInstance(Request $request): Response
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $tournamentDTO = new TournamentDTO();
        $tournamentDTO->setName($data['tournamentName']);
        $tournamentDTO->setStartDate(DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $data['startDate']));
        $tournamentDTO->setEndDate(DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $data['endDate']));

        $this->tournamentService->createTournament($tournamentDTO);

        return $this->json($tournamentDTO);

    }

    /**
     * Get all tournaments
     * @return Response
     */

    #[Route('/api/tournaments', methods: ['GET'])]
    public function getAllTournaments(): Response
    {
        return $this->json($this->tournamentService->getAllTournaments());
    }

    /**
     * Update a tournament by ID
     * @param int $tournamentId
     * @return Response
     */
    #[Route('/api/tournaments/{tournamentId}', methods: ['GET'])]
    public function getTournament(int $tournamentId): Response
    {
        return $this->json($this->tournamentService->getTournament($tournamentId));
    }

    /**
     * Update a tournament
     * @throws JsonException
     */
    #[Route('/api/tournaments/{tournamentId}', methods: ['PATCH', 'PUT'])]
    public function updateTournament(int $tournamentId, Request $request): Response
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        $tournamentDTO = new TournamentDTO();
        $tournamentDTO->setName($data['tournamentName']);
        $tournamentDTO->setStartDate(DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $data['startDate']));
        $tournamentDTO->setEndDate(DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $data['endDate']));

        $this->tournamentService->updateTournament($tournamentId, $tournamentDTO);

        return $this->json($this->tournamentService->getTournament($tournamentId));

    }

    /**
     * Delete a tournament
     * @param int $tournamentId
     * @return Response
     */
    #[Route('/api/tournaments/{tournamentId}', methods: ['DELETE'])]
    public function deleteTournament(int $tournamentId): Response
    {
        return $this->json($this->tournamentService->deleteTournament($tournamentId));
    }
}
