import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
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

interface TeamState {
  selectedUsers: User[];
  name: string;
}

const initialState: TeamState = {
  selectedUsers: [],
  name: '',
};

const userSelect = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setSelectedUsers: (state, action: PayloadAction<User[]>) => {
      state.selectedUsers = action.payload;
    },
    removeUserFromTeam: (state, action: PayloadAction<string>) => {
      
      state.selectedUsers = state.selectedUsers.filter(user => user._id !== action.payload);
    },

    setTeamName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearTeamState: (state) => {
      state.selectedUsers = [];
      state.name = '';
    },
  },
});

export const { setSelectedUsers, setTeamName, clearTeamState,removeUserFromTeam } = userSelect.actions;


export default userSelect.reducer;
