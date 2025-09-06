"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://shoira-blog-uz-api.onrender.com/api/chat";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ _id: string; user: { name: string }; message: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // JWT tokenni localStorage'dan olish
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

  // Yangi xabar yuborish
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
      <div className="p-6 text-center text-red-600">
        Chatdan foydalanish uchun avval login qiling!
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat sahifasi</h1>

      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : (
        <div className="border rounded-lg p-4 h-80 overflow-y-auto bg-gray-50">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg._id} className="mb-2">
                <strong>{msg.user?.name || "Anonim"}:</strong> {msg.message}
              </div>
            ))
          ) : (
            <p>Hozircha xabarlar yo‘q</p>
          )}
        </div>
      )}

      <div className="flex mt-4 gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Xabar yozing..."
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Yuborish
        </button>
      </div>
    </div>
  );
}
