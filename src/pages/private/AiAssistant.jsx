import React, { useEffect, useRef, useState } from "react";

import { FaRobot, FaPaperPlane, FaWifi, FaPrint, FaLock, FaServer, FaClock, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";

const AiAssistant = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text:
        "👋 Welcome to Smart ICT AI Helpdesk.\nDescribe your ICT issue for instant troubleshooting.",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // AI ENGINE
  const generateAIResponse = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("wifi") || msg.includes("internet") || msg.includes("network")) {
      return {
        category: "Network",
        priority: "High",
        technician: "Network Engineer",
        confidence: "96%",
        solution:
          "🔧 Network Troubleshooting:\n\n• Restart router/switch\n• Check cables\n• Reconnect WiFi\n• Run diagnostics",
      };
    }

    if (msg.includes("printer")) {
      return {
        category: "Printer",
        priority: "Medium",
        technician: "Hardware Technician",
        confidence: "93%",
        solution:
          "🖨 Printer Fix:\n\n• Check power\n• Reinstall drivers\n• Restart spooler",
      };
    }

    if (msg.includes("password") || msg.includes("login")) {
      return {
        category: "Authentication",
        priority: "High",
        technician: "System Admin",
        confidence: "97%",
        solution:
          "🔐 Login Issue:\n\n• Reset password\n• Clear cache\n• Verify email",
      };
    }

    if (msg.includes("server")) {
      return {
        category: "Server",
        priority: "Critical",
        technician: "Infra Team",
        confidence: "98%",
        solution:
          "🖥 Server Issue:\n\n• Check uptime\n• Restart services\n• Review logs",
      };
    }

    return {
      category: "General",
      priority: "Low",
      technician: "ICT Helpdesk",
      confidence: "80%",
      solution:
        "🤖 I can help with WiFi, printers, login issues, servers, and software problems.",
    };
  };

  // SEND MESSAGE
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      type: "user",
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const ai = generateAIResponse(input);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: ai.solution,
          meta: ai,
          time: new Date().toLocaleTimeString(),
        },
      ]);

      setLoading(false);
    }, 900);

    setInput("");
  };

  const prompts = [
    { icon: <FaWifi />, text: "WiFi not working" },
    { icon: <FaPrint />, text: "Printer offline" },
    { icon: <FaLock />, text: "Password reset" },
    { icon: <FaServer />, text: "Server down" },
  ];

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-2xl text-3xl">
            <FaRobot />
          </div>

          <div>
            <h1 className="text-3xl font-black">AI Assistant</h1>
            <p className="text-gray-500">Smart ICT troubleshooting engine</p>
          </div>

        </div>

        <div className="text-green-600 font-bold">
          AI Online
        </div>

      </div>

      {/* PROMPTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p.text)}
            className="bg-white p-4 rounded-xl border hover:bg-blue-50"
          >
            <div className="text-xl text-blue-600">{p.icon}</div>
            <p className="text-sm mt-2">{p.text}</p>
          </button>
        ))}
      </div>

      {/* CHAT BOX */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        {/* CHAT AREA */}
        <div className="h-[520px] overflow-y-auto p-5 bg-gray-50 space-y-4">

          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

              {msg.type === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-2xl max-w-md">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl border max-w-lg">
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {msg.meta && (
                      <div className="mt-3 text-xs text-gray-500 flex gap-2 flex-wrap">
                        <span>{msg.meta.category}</span>
                        <span>{msg.meta.priority}</span>
                        <span>{msg.meta.technician}</span>
                        <span>{msg.meta.confidence}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm">AI is typing...</div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {/* INPUT */}
        <div className="p-4 border-t flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border p-3 rounded-xl"
            placeholder="Type ICT issue..."
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 rounded-xl"
          >
            <FaPaperPlane />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AiAssistant;