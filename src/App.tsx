import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { theme, darkTheme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ChatPage from "./components/Chat/ChatPage";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
