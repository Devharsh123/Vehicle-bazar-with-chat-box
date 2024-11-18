import { useEffect, useState } from "react";
import "./VendorChat.css";
import io from "socket.io-client";
import { useLoadUsers } from "../utils/useLoadUsers";
import { Link } from "react-router-dom";

const socket = io("http://localhost:3000", { autoConnect: false });
const VendorChatBox = () => {
  const [getMessages, setMessages] = useState([]);
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
    // Fetch past messages
    socket.emit("getMessages", { vendorId: data.id, role: data.role });

    // Receive message history
    socket.on("messageHistory", (history) => {
      setMessages(history);
    });

    return () => {
      socket.off("connect");
      socket.off("getMessages");
      socket.off("messageHistory");
      socket.off("disconnect");
    };
  }, [data.id]);
  console.log(getMessages, "messages");

  return (
    <div class="area flex flex-wrap">
      {getMessages
        .filter((message) => message.receiverId === data.id)
        .map((message) => (
          <div class="w-1/2 px-4 lg:w-1/3 py-1 m-4 ">
            <Link
              to={`/chat/${message.senderId}?productId=${message.productId}`}
              class="bg-white shadow-lg rounded-lg my-6 grid grid-cols-[auto,1fr] hover:bg-gray-100 cursor-pointer"
            >
              <div class="bg-gray-100 px-5 py-2 grid items-end justify-center __col h-full">
                <a
                  href="#"
                  class="text-blue-600 font-medium hover:text-blue-800"
                >
                  Learn more
                </a>
              </div>
              <div class="p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">
                  {message.senderId}
                </h2>
                {message.messages.map((val) => (
                  <p class="text-gray-600">{val.content}</p>
                ))}
              </div>
            </Link>
          </div>
        ))}

      {/* <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> */}
    </div>
  );
};

export default VendorChatBox;
