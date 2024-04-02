import { Router } from "express";
import { createTeam, getTeamById, getAllTeams } from "../controllers/team.controller.js";

const router = Router();

// Route for creating a new team
router.post('/team', createTeam);

// Route for retrieving details of a specific team by ID
router.get('/team/:id', getTeamById);

// Route for fetching all teams
router.get('/team', getAllTeams);

export default router;
