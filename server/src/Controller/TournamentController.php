<?php

namespace App\Controller;

use App\Service\TournamentService;
use Exception;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class TournamentController extends AbstractController
{
    private TournamentService $tournamentService;

    public function __construct(TournamentService $tournamentService)
    {
        $this->tournamentService = $tournamentService;
    }

    /**
     * @throws JsonException
     */
    #[Route('/api/tournaments', methods: ['POST'])]
    public function createInstance(Request $request): Response {
        return $this->json($this->tournamentService->createTournament($request));
    }

    #[Route('/api/tournaments', methods: ['GET'])]
    public function getCollection(): Response {
        return $this->json($this->tournamentService->getTournaments());
    }

    #[Route('/api/tournaments/{tournamentId}', methods: ['GET'])]
    public function getTournament(int $tournamentId): Response {
        return $this->json($this->tournamentService->getTournament($tournamentId));
    }

    /**
     * @throws JsonException
     * @throws Exception
     */
    #[Route('/api/tournaments/{tournamentId}', methods: ['PATCH', 'PUT'])]
    public function updateTournament(int $tournamentId, Request $request): Response {
        return $this->json($this->tournamentService->updateTournament($tournamentId, $request));
    }

    /**
     * @throws Exception
     */
    #[Route('/api/tournaments/{tournamentId}', methods: ['DELETE'])]
    public function deleteTournament(int $tournamentId): Response
    {
        return $this->json($this->tournamentService->deleteTournament($tournamentId));
    }

}
