// teamsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Team {
  _id: string;
  name: string;
  users: any[];
}

interface TeamsState {
  teams: Team[];
}

const initialState: TeamsState = {
  teams: [],
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<Team[]>) {
      state.teams = action.payload;
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
