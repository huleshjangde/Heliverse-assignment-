// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

// Define a TypeScript interface for your state
interface ProjectState {
  projectOverview: string;
  projectPhasesContent: string;
  keyFeaturesContent: string;
  technologyStackContent: string;
  timelineContent: string;
  budgetContent: string;
  expectedOutcomesContent: string;
}

// Initial state using the interface
const initialState: ProjectState = {
  projectOverview: "",
  projectPhasesContent: "",
  keyFeaturesContent: "",
  technologyStackContent: "",
  timelineContent: "",
  budgetContent: "",
  expectedOutcomesContent: "",
};

// Create the slice
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectOverview(state, action: PayloadAction<string>) {
      state.projectOverview = action.payload;
    },
    setProjectPhasesContent(state, action: PayloadAction<string>) {
      state.projectPhasesContent = action.payload;
    },
    setKeyFeaturesContent(state, action: PayloadAction<string>) {
      state.keyFeaturesContent = action.payload;
    },
    setTechnologyStackContent(state, action: PayloadAction<string>) {
      state.technologyStackContent = action.payload;
    },
    setTimelineContent(state, action: PayloadAction<string>) {
      state.timelineContent = action.payload;
    },
    setBudgetContent(state, action: PayloadAction<string>) {
      state.budgetContent = action.payload;
    },
    setExpectedOutcomesContent(state, action: PayloadAction<string>) {
      state.expectedOutcomesContent = action.payload;
    },
    resetOutputs(state) {
      state.projectOverview = "";
      state.projectPhasesContent = "";
      state.keyFeaturesContent = "";
      state.technologyStackContent = "";
      state.timelineContent = "";
      state.budgetContent = "";
      state.expectedOutcomesContent = "";
    },
  },
});

// Export actions
export const {
  setProjectPhasesContent,
  setKeyFeaturesContent,
  setTechnologyStackContent,
  setTimelineContent,
  setBudgetContent,
  setExpectedOutcomesContent,
  setProjectOverview,
  resetOutputs,
} = projectSlice.actions;

// Export the reducer
export default projectSlice.reducer;
