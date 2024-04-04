import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the user data
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  domain: string;
  gender: string;
  available: boolean;
  avatar: string;
}

// Define the initial state
const initialState: User[] = [];

// Create the slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Action to set the users' data
    setUsers(state, action: PayloadAction<User[]>) {
      return action.payload;
    },
    // Action to add a single user
    addUser(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
    // Action to remove a single user
    removeUser(state, action: PayloadAction<string>) {
      return state.filter(user => user._id !== action.payload);
    },
    // Action to update a single user
    updateUser(state, action: PayloadAction<User>) {
      const index = state.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

// Export the actions and reducer
export const { setUsers, addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
