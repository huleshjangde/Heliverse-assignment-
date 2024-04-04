import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserFormState {
  first_name: string;
  last_name: string;
  email: string;
  domain: string;
  gender: string;
  available: boolean;
  avatar: string;
  [key: string]: string | boolean;
}

interface FormSliceState {
  formData: UserFormState;
}

const initialState: FormSliceState = {
  formData: {
    _id:"",
    first_name: "",
    last_name: "",
    email: "",
    domain: "",
    gender: "",
    available: false,
    avatar: "",
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormField(state: FormSliceState, action: PayloadAction<{ field: string; value: string | boolean }>) {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    clearForm(state: FormSliceState) {
      state.formData = initialState.formData;
    },
  },
});

export const { setFormField, clearForm } = formSlice.actions;

export default formSlice.reducer;
