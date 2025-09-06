"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://shoira-blog-uz-api.onrender.com/api/chat";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ _id: string; user: { name: string }; message: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Token olish
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
    fetchMessages();
  }, []);

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

  if (!token) {
    return (
      <div className="p-6 text-center text-red-600 text-lg">
        Chatdan foydalanish uchun avval login qiling!
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">💬 Real-Time Chat</h1>

      <div className="bg-white shadow-lg rounded-2xl p-4 h-[450px] flex flex-col">
        {loading ? (
          <p className="text-center text-gray-500">Yuklanmoqda...</p>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-gray-50 rounded-lg">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className="flex items-start gap-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    {msg.user?.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{msg.user?.name || "Anonim"}</div>
                    <div className="text-gray-700">{msg.message}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">Hozircha xabarlar yo‘q</p>
            )}
          </div>
        )}

        <div className="flex mt-3 gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Xabar yozing..."
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            Yuborish
          </button>
        </div>
      </div>
    </div>
  );
}
