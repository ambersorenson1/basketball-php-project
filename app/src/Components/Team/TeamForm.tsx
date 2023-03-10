import React { useState } from "react";
import { Team } from './TeamInterface';
import {create} from "zustand";
import axios from 'axios';
import {useQuery} from "@tanstack/react-query";

interface TeamStore {
    teams: Team[];
    setTeams: (teams: Team[]) => void;
}

const useTeamStore = create<TeamStore>(set => ({
    teams: [],
    setTeams: teams => set ({ teams })
}));

function TeamForm() {
const { teams, setTeams } = useTeamStore();

const fetchTeams = async (): Promise<Team[]> => {
    try{
        const response = await axios.get('https://localhost:8000/api/teams');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
    useQuery(['team'], fetchTeams, {
        onSuccess: data => {
            setTeams(data);
        },
    });

    if(!teams)
}

export default TeamForm;


