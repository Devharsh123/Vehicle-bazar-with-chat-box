import useSocketHook from "../utils/useSocketHook";
import "./VendorChat.css";
import { Link } from "react-router-dom";

const VendorChatBox = () => {
  const { messageList, inputValue, data, setInputValue, handleSendMessage } =
    useSocketHook();

  const conversation = messageList
    .flatMap((msg) => msg.messages)
    .filter((message) => message.receiverId === data.id)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .reduce((acc, message) => {
      const { senderId } = message;
      if (!acc[senderId]) {
        acc[senderId] = { senderId, messages: [] };
      }
      acc[senderId].messages.push(message);
      return acc;
    }, {});

  // Convert the object to an array if needed
  const result = Object.values(conversation);

  return (
    <div class="area flex flex-wrap">
      {result.map((message) => (
        <div class="w-1/2 px-4 lg:w-1/3 py-1 m-4 ">
          <Link
            to={`/chat/${message.senderId}?productId=${message.productId}`}
            class="bg-white shadow-lg rounded-lg my-6 grid grid-cols-[auto,1fr] hover:bg-gray-100 cursor-pointer"
          >
            <div class="bg-gray-100 px-5 py-2 grid items-end justify-center __col h-full">
              <a href="#" class="text-blue-600 font-medium hover:text-blue-800">
                Learn more
              </a>
            </div>
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">
                {message.senderId}
              </h2>
              {message.messages.slice(-3).map((val, idx) => (
                <p key={idx} class="text-gray-600">
                  {val.content}
                </p>
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
