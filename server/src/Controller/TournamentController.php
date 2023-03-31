<?php


namespace App\Controller;

use App\Service\TournamentService;
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
        return $this->json($this->tournamentService->createTournament($request));
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
        return $this->json($this->tournamentService->updateTournament($tournamentId, $request));
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
