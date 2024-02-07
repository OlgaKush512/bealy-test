import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
};

export const authSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
    loadAccountsFromLocalStorage: (state) => {
      const storedAccounts = localStorage.getItem("userProfiles");
      if (storedAccounts) {
        state.accounts = JSON.parse(storedAccounts);
      }
    },
  },
});

export const { addAccount, loadAccountsFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
