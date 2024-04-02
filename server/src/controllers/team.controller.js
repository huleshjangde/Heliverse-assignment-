
import mongoose from 'mongoose';

import { Team } from '../models/index.js';
// Controller for creating a new team

export const createTeam = async (req, res) => {
    const { name, selectedUsers } = req.body;
    console.log(name,selectedUsers);
    try {
      // Validate the data (e.g., check if the team name is provided)
      if (!name || !selectedUsers || !Array.isArray(selectedUsers) || selectedUsers.length === 0) {
        return res.status(400).json({ error: 'Invalid team data' });
      }
  
      // Save the team data into MongoDB
      const team = new Team({ name, selectedUsers });
      const savedTeam = await team.save();
  
      // Send a success response with the saved team data
      res.status(201).json({ team: savedTeam });
    } catch (error) {
      // Handle any errors and send an error response
      console.error('Error creating team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Controller for retrieving details of a specific team by ID
  export const getTeamById = async (req, res) => {
    try {
      const teamId = req.params.id;
      const team = await Team.findById(teamId).populate('users');
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
      res.json(team);
    } catch (error) {
      console.error('Error retrieving team details:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Controller for fetching all teams
  export const getAllTeams = async (req, res) => {
    try {
      const teams = await Team.find({});
      res.json(teams);
    } catch (error) {
      console.error('Error fetching teams:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  