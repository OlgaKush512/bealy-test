import React, { useState, useEffect, ChangeEvent } from "react";
import OT from "@opentok/client";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { combineReducers } from "@reduxjs/toolkit";
import MainLayout from "../Layouts/MainLayout";

const rootReducer = combineReducers({});

export type IRootState = ReturnType<typeof rootReducer>;

interface Message {
  username: string;
  text: string;
  timestamp: Date;
}

const ChatComponent: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const currentUser = useSelector(
    (state: IRootState) => state.accounts.currentUser
  );

  useEffect(() => {
    const session = OT.initSession(
      import.meta.env.VITE_API_KEY,
      import.meta.env.VITE_SESSION_ID
    );
    session.connect(import.meta.env.VITE_TOKEN, function (error) {
      if (error) {
        console.log("Error connecting: ", error.name, error.message);
      } else {
        console.log("Connected to the session.");
      }
    });

    return () => {
      session.disconnect();
    };
  }, []);

  useEffect(() => {
    const storedMessages = localStorage.getItem(
      `chatMessages_${localStorage.getItem("currentUser")}`
    );
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const messageHandler = () => {
    const newMessage: Message = {
      username: currentUser,
      text: message,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem(
        `chatMessages_${localStorage.getItem("currentUser")}`,
        JSON.stringify(updatedMessages)
      );
      return updatedMessages;
    });
    setMessage("");
    localStorage.setItem(
      `chatMessages_${localStorage.getItem("currentUser")}`,
      JSON.stringify([...messages, newMessage])
    );
  };

  const handleLogin = (login: string) => {
    navigate(`/profile/${login}`);
  };

  return (
    <>
      <MainLayout />
      <Container>
        <Paper sx={{ borderRadius: "16px", height: "60vh" }}>
          <Box>
            <Box
              sx={{
                padding: 10,
                height: "60vh",
                width: "50vw",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "transparent transparent #888888 transparent",
                "&::-webkit-scrollbar": { width: "12px" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#FFF",
                  borderRadius: "6px",
                },
              }}
            >
              {messages.map((messageContent, index: number) => {
                return (
                  <Paper
                    key={index}
                    sx={{ marginY: 2 }}
                    onClick={() => handleLogin(messageContent.username)}
                  >
                    <Typography variant="subtitle2" textAlign="left" ml={2}>
                      {messageContent.username}
                    </Typography>
                    <Typography textAlign="right" mr={4}>
                      {messageContent.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      textAlign="left"
                      fontSize={10}
                    >
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }).format(new Date(messageContent.timestamp))}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                justifyContent: "center",
                mx: 3,
                p: 3,
              }}
            >
              <TextField
                required
                autoFocus
                variant="outlined"
                margin="dense"
                id="chat"
                name="chat"
                multiline
                value={message}
                onChange={handleInputChange}
                sx={{ width: "50vw" }}
              />
              <Button variant="contained" onClick={messageHandler}>
                Send
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ChatComponent;
