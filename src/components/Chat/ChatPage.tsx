import React, { useState, useEffect, ChangeEvent } from "react";
import OT from "@opentok/client";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface Message {
  username: string;
  text: string;
  timestamp: Date;
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const session = OT.initSession(
      "47856981",
      "2_MX40Nzg1Njk4MX5-MTcwNzMxOTA2NzkyNH4rMlAvWmtnSnFXUjY0czYrUElpZitEMnZ-fn4"
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
      username: "Username",
      text: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    localStorage.setItem(
      `chatMessages_${localStorage.getItem("currentUser")}`,
      JSON.stringify([...messages, newMessage])
    );
  };

  return (
    <div>
      <Paper sx={{ borderRadius: "16px" }}>
        <Box>
          <Box sx={{ padding: 10 }}>
            {messages.map((messageContent, index: number) => {
              return (
                <Paper key={index} sx={{ marginY: 2 }}>
                  <Typography>{messageContent.username}</Typography>
                  <Typography>{messageContent.text}</Typography>
                  <Typography>
                    {messageContent.timestamp.toLocaleString()}
                  </Typography>
                </Paper>
              );
            })}
          </Box>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "center" }}
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
            />
            <Button onClick={messageHandler}>Send</Button>
          </Stack>
        </Box>
      </Paper>
    </div>
  );
};

export default ChatComponent;
