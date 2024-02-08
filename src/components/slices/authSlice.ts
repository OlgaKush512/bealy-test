import { createSlice } from "@reduxjs/toolkit";
import { Account } from "../LoginForm/LoginForm";

interface InitialState {
  accounts: Account[];
  currentUser: string;
}

const initialState: InitialState = {
  accounts: [],
  currentUser: "",
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
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { addAccount, loadAccountsFromLocalStorage, setCurrentUser } =
  authSlice.actions;
export default authSlice.reducer;
