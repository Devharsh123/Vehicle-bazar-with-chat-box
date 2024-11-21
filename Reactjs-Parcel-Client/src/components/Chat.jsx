import { useParams, useLocation } from "react-router-dom";
import useSocketHook from "../utils/useSocketHook";
import "./Chat.css";

const Chat = () => {
  const { id } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");

  const { messageList, inputValue, data, setInputValue, handleSendMessage } =
    useSocketHook(id, productId);

  const conversation = messageList
    .flatMap((msg) => msg.messages)
    .filter((message) => message.senderId === id || message.receiverId === id)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div className="flex">
      <div className="chat">
        <div className="chat-header">
          <span>Nest Chat App</span>
        </div>
        <div className="chat-message-list">
          {conversation.map((convo, idx) => (
            <div key={idx} className="chat-message">
              <div
                key={idx}
                className={`chat-message-bubble ${
                  convo.receiverId === id ? "outgoing" : "incoming"
                }`}
              >
                <span className="flex text-blue-400 font-bold">
                  {convo.receiverId === id ? "Sent" : "Received"}
                </span>
                <span className="chat-message-body">{convo.content}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-composer">
          <input
            className="chat-composer-input"
            placeholder="Type message here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSendMessage}
          />
        </div>
      </div>
      <div className="w-1/2">
        <img
          className="mt-40 px-5 flex justify-center items-center rounded-md"
          src={require("../assets/toyota-traisor.jpg")}
          alt="this will be the products image"
          srcset=""
        />
      </div>
    </div>
  );
};

export default Chat;
