"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

const API_URL = "https://shoira-blog-uz-api.onrender.com/api/chat";
const SECRET_PASSWORD = "Ketamiz";
const SOCKET_URL = "https://shoira-blog-uz-api.onrender.com"; // Server URL

interface ChatMessage {
  _id: string;
  userName: string;
  message: string;
  createdAt?: string;
}

// Har bir foydalanuvchi uchun fon rangini tanlaymiz
function getUserColor(userName: string) {
  const colors = [
    "bg-gradient-to-r from-pink-400 to-pink-500 text-white",
    "bg-gradient-to-r from-green-400 to-green-500 text-white",
    "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white",
    "bg-gradient-to-r from-purple-400 to-purple-500 text-white",
    "bg-gradient-to-r from-blue-400 to-blue-500 text-white",
    "bg-gradient-to-r from-orange-400 to-orange-500 text-white",
    "bg-gradient-to-r from-teal-400 to-teal-500 text-white",
    "bg-gradient-to-r from-red-400 to-red-500 text-white",
  ];
  let sum = 0;
  for (let i = 0; i < userName.length; i++) {
    sum += userName.charCodeAt(i);
  }
  return colors[sum % colors.length];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const myName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;

  // Xabarlarni olish
  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      const filtered = res.data.filter((msg: any) => new Date(msg.createdAt).getTime() > oneDayAgo);
      setMessages(filtered);
    } catch (error) {
      console.error("Xabarlarni olishda xato:", error);
    } finally {
      setLoading(false);
    }
  };

  // Socket.io ulanish
  useEffect(() => {
    if (!isAuthorized) return;

    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
      console.log("Socket.io ulandi");
    });

    socketRef.current.on("newMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    fetchMessages();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [isAuthorized]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Yangi xabar yuborish
  const sendMessage = async () => {
    if (!newMessage.trim() || !socketRef.current) return;

    const tempMessage: ChatMessage = {
      _id: `temp-${Date.now()}`,
      userName: myName || "Anonim",
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      await axios.post(
        API_URL,
        { message: tempMessage.message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      socketRef.current.emit("sendMessage", tempMessage);
    } catch (error) {
      console.error("Xabar yuborishda xato:", error);
      setMessages((prev) => prev.filter((msg) => msg._id !== tempMessage._id));
    }
  };

  if (!token) {
    return <div className="p-6 text-center text-red-500 text-lg font-medium">Chatdan foydalanish uchun login qiling!</div>;
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
          <h2 className="text-xl font-bold mb-3 text-gray-700">🔒 Chat himoyalangan</h2>
          <p className="text-gray-500 mb-4 text-sm">Kirish uchun parolni kiriting:</p>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (inputPassword === SECRET_PASSWORD) setIsAuthorized(true);
                else alert("❌ Parol noto‘g‘ri!");
              }
            }}
            placeholder="Parol"
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-sm"
          />
          <button
            onClick={() => {
              if (inputPassword === SECRET_PASSWORD) setIsAuthorized(true);
              else alert("❌ Parol noto‘g‘ri!");
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
          >
            Kirish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        💬 Secure Chat (Socket.io)
      </h1>
      <p className="text-center text-xs text-gray-400 mb-4">
        ⚠️ Xabarlar 24 soat ichida avtomatik o‘chiriladi
      </p>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl rounded-3xl p-4 h-[550px] flex flex-col border border-gray-200">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-lg">
            {messages.length > 0 ? (
              messages.map((msg) => {
                const isMine = msg.userName === myName;
                const userColor = isMine
                  ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white"
                  : getUserColor(msg.userName || "Anonim");
                return (
                  <div key={msg._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed shadow ${userColor}`}>
                      {!isMine && (
                        <div className="font-semibold text-gray-100 text-xs mb-1">
                          {msg.userName || "Anonim"}
                        </div>
                      )}
                      <div className="text-[15px]">{msg.message}</div>
                      {msg.createdAt && (
                        <div className="text-[10px] mt-1 text-gray-200">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-400 italic">Hozircha xabarlar yo‘q...</p>
            )}
            <div ref={chatEndRef}></div>
          </div>
        )}

        {/* Xabar yuborish joyi */}
        <div className="flex items-center mt-4 bg-white rounded-full shadow-lg border border-gray-200 px-3 py-2 gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Xabaringizni yozing..."
            className="flex-1 resize-none border-none focus:ring-0 focus:outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
            rows={1}
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2 rounded-full shadow-md transition text-sm font-medium"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
