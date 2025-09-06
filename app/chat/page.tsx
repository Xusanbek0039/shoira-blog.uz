"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_URL = "https://shoira-blog-uz-api.onrender.com/api/chat";
const SECRET_PASSWORD = "Ketamiz"; // Chatga kirish paroli

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { _id: string; user: { name: string }; message: string; createdAt?: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Xabarlarni olish
  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (error) {
      console.error("Xabarlarni olishda xato:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchMessages();
    }
  }, [isAuthorized]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Xabar yuborish
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(
        API_URL,
        { message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Xabar yuborishda xato:", error);
    }
  };

  // Token bo'lmasa login so'raydi
  if (!token) {
    return (
      <div className="p-6 text-center text-red-500 text-lg font-medium">
        Chatdan foydalanish uchun avval login qiling!
      </div>
    );
  }

  // Parol oynasi
  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
          <h2 className="text-xl font-bold mb-3 text-gray-700">🔒 Chat himoyalangan</h2>
          <p className="text-gray-500 mb-4 text-sm">Kirish uchun maxfiy parolni kiriting:</p>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (inputPassword === SECRET_PASSWORD) {
                  setIsAuthorized(true);
                } else {
                  alert("❌ Parol noto‘g‘ri! Qaytadan urinib ko‘ring.");
                }
              }
            }}
            placeholder="Parolni kiriting"
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-sm"
          />
          <button
            onClick={() => {
              if (inputPassword === SECRET_PASSWORD) {
                setIsAuthorized(true);
              } else {
                alert("❌ Parol noto‘g‘ri! Qaytadan urinib ko‘ring.");
              }
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
          >
            Kirish
          </button>
        </div>
      </div>
    );
  }

  // Chat oynasi
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        💬 Modern Chat
      </h1>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl rounded-3xl p-4 h-[550px] flex flex-col border border-gray-200">
        {loading ? (
          <p className="text-center text-gray-500">Yuklanmoqda...</p>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4 p-3 rounded-lg">
            {messages.length > 0 ? (
              messages.map((msg, i) => {
                const isMine = msg.user?.name === "Siz";
                return (
                  <div
                    key={msg._id || i}
                    className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    {!isMine && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white flex items-center justify-center text-sm font-bold shadow">
                        {msg.user?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}

                    <div
                      className={`max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed shadow transition ${
                        isMine
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none"
                          : "bg-white border border-gray-200 rounded-bl-none text-gray-800"
                      }`}
                    >
                      {!isMine && (
                        <div className="font-semibold text-gray-600 text-xs mb-1">
                          {msg.user?.name || "Anonim"}
                        </div>
                      )}
                      <div className={`${isMine ? "text-gray-100" : "text-gray-800"} text-[15px]`}>
                        {msg.message}
                      </div>
                      {msg.createdAt && (
                        <div
                          className={`text-[10px] mt-1 ${
                            isMine ? "text-gray-200" : "text-gray-400"
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </div>
                      )}
                    </div>

                    {isMine && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow">
                        {msg.user?.name?.charAt(0).toUpperCase() || "S"}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-400 italic">Hozircha xabarlar yo‘q</p>
            )}
            <div ref={chatEndRef}></div>
          </div>
        )}

        <div className="flex mt-4 gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Xabar yozing..."
            className="flex-1 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white shadow-sm placeholder-gray-400 text-gray-800"
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2 rounded-full shadow-lg transition text-sm font-medium"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
