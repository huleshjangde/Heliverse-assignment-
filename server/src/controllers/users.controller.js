
import mongoose from 'mongoose';

import { User } from '../models/index.js';
// Controller for creating a new user
// Controller for creating a new user
export const createUser = async (req, res) => {
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
    try {
      const newUser = await User.create({first_name, last_name, email, gender, avatar, domain, available });
      res.status(201).json(newUser);
      console.log('====================================');
      console.log(newUser);
      console.log('====================================');
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(400).json({ error: 'Failed to create user' });
    }
  };
  
  
  // Controller for retrieving all users
  export const getAllUsers = async (req, res) => {
    
      try {
        const page = parseInt(req.query.page) || 1; // Current page number
        const limit = parseInt(req.query.limit) || 20; // Number of items per page
        const startIndex = (page - 1) * limit;
    console.log(page);
        const users = await User.find()
          .skip(startIndex)
          .limit(limit);
    
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);
    
        const pagination = {
          currentPage: page,
          totalPages: totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          nextPage: page + 1,
          prevPage: page - 1
        };
    
        res.json({ users, pagination });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }}
  
  
  // Controller for retrieving a specific user by ID
  export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Controller for updating a user by ID
 // Controller for updating a user by ID
export const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { first_name, last_name, email, gender, avatar, domain, available }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user by ID:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  // Controller for deleting a user by ID
  export const deleteUserById = async (req, res) => {
     const userId = req.params.id;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user by ID:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  