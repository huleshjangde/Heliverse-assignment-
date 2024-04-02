import { Router } from "express";

import {createUser,deleteUserById,getAllUsers,getUserById,updateUserById} from "../controllers/users.controller.js"


const router = Router()

// Route for creating a new user
router.post('/users', createUser);

// Route for fetching all users
router.get('/users', getAllUsers);

// Route for fetching a user by ID
router.get('/users/:id', getUserById);

// Route for updating a user by ID
router.put('/users/:id', updateUserById);

// Route for deleting a user by ID
router.delete('/users/:id', deleteUserById);

export default router;