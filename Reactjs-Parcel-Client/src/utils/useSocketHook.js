import { useEffect, useState } from "react";
import { useLoadUsers } from "./useLoadUsers";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });
// create a new socket instance with localhost URL

const useSocketHook = (id, productId) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const { data } = useLoadUsers();

  useEffect(() => {
    socket.connect(); // connect to socket

    socket.on("connect", () => {
      // fire when we have connection
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      // fire when socked is disconnected
      console.log("Socket disconnected");
    });

    socket.emit("getMessages", { vendorId: data.id, role: data.role });

    // Receive message history
    socket.on("messageHistory", (history) => {
      setMessages(history);
    });

    // listen chat event messages
    // socket.on("chat", (newMessage) => {
    //   console.log("New message added", newMessage);
    //   setMessages((previousMessages) => [...previousMessages, newMessage]);
    // });

    // remove all event listeners
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("messageHistory");
      socket.off("chat");
    };
  }, []);

  console.log(messages, "messages");
  const handleSendMessage = (e) => {
    console.log(e.key, "came value ->e");
    if (e.key !== "Enter" || inputValue.trim().length === 0) return;

    // send a message to the server
    socket.emit("chat", {
      productId,
      senderId: data.id,
      receiverId: id,
      role: data.role,
      content: inputValue.trim(),
    });
    setInputValue("");
  };

  return { messages, inputValue, data, setInputValue, handleSendMessage };
};

export default useSocketHook;
