
import React, { useEffect, useRef, useState } from "react";

import {
  FaRobot,
  FaPaperPlane,
  FaWifi,
  FaPrint,
  FaLock,
  FaServer,
  FaCheckCircle,
} from "react-icons/fa";

import { motion } from "framer-motion";

import { useAuth } from "../../contexts/AuthContext";

import { createEnterpriseTicket } from "../../services/tickets/createEnterpriseTicket";

const AiAssistant = () => {
  const { user } = useAuth();

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text:
        "👋 Welcome to ICT AI Copilot.\nDescribe your issue and I will diagnose it instantly.",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // =============================================
  // AUTO SCROLL
  // =============================================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =============================================
  // ENTERPRISE AI ENGINE
  // =============================================
  const generateAIResponse = (text) => {
    const msg = text.toLowerCase();

    let response = {
      category: "General",
      priority: "Low",
      technician: "ICT Support",
      confidence: "82%",
      solution:
        "🤖 I can help with WiFi, printers, login issues, servers, and software problems.",
    };

    // NETWORK
    if (
      msg.includes("wifi") ||
      msg.includes("internet") ||
      msg.includes("network")
    ) {
      response = {
        category: "Network",
        priority: "High",
        technician: "Network Engineer",
        confidence: "96%",
        solution:
          "🔧 Network Diagnostics:\n\n• Restart router\n• Check connectivity\n• Verify IP settings\n• Run ping test",
      };
    }

    // PRINTER
    else if (msg.includes("printer")) {
      response = {
        category: "Hardware",
        priority: "Medium",
        technician: "Hardware Technician",
        confidence: "93%",
        solution:
          "🖨 Printer Troubleshooting:\n\n• Check power cable\n• Restart spooler service\n• Reinstall drivers\n• Clear print queue",
      };
    }

    // LOGIN
    else if (
      msg.includes("password") ||
      msg.includes("login")
    ) {
      response = {
        category: "Authentication",
        priority: "High",
        technician: "System Administrator",
        confidence: "97%",
        solution:
          "🔐 Authentication Issue:\n\n• Reset password\n• Clear browser cache\n• Verify account permissions\n• Enable MFA",
      };
    }

    // SERVER
    else if (
      msg.includes("server") ||
      msg.includes("down")
    ) {
      response = {
        category: "Infrastructure",
        priority: "Critical",
        technician: "Infrastructure Team",
        confidence: "98%",
        solution:
          "🖥 Server Incident:\n\n• Check uptime\n• Restart services\n• Review logs\n• Escalate immediately",
      };
    }

    return response;
  };

  // =============================================
  // SEND MESSAGE
  // =============================================
  const handleSend = () => {
    if (!input.trim()) return;

    const currentInput = input;

    const userMsg = {
      type: "user",
      text: currentInput,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    setLoading(true);

    // FAST AI RESPONSE
    setTimeout(() => {
      const ai = generateAIResponse(currentInput);

      const shouldAutoCreate =
        ai.priority === "High" ||
        ai.priority === "Critical";

      const aiMsg = {
        type: "ai",
        text: ai.solution,
        meta: ai,
        rawInput: currentInput,
        suggestTicket: shouldAutoCreate,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      setLoading(false);
    }, 700);
  };

  // =============================================
  // QUICK PROMPTS
  // =============================================
  const prompts = [
    {
      icon: <FaWifi />,
      text: "WiFi not working",
    },
    {
      icon: <FaPrint />,
      text: "Printer offline",
    },
    {
      icon: <FaLock />,
      text: "Password reset",
    },
    {
      icon: <FaServer />,
      text: "Server down",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">

      {/* =============================================
          HEADER
      ============================================= */}
      <div className="bg-white rounded-3xl shadow border p-6 mb-6">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-2xl text-2xl">
              <FaRobot />
            </div>

            <div>
              <h1 className="text-3xl font-black text-blue-600">
                AI ICT Assistant
              </h1>

              <p className="text-gray-500">
                Enterprise AI-powered troubleshooting assistant
              </p>
            </div>

          </div>

          <div className="flex gap-2 flex-wrap justify-center">

            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
              ● AI Online
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
              ● Smart Ticketing
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
              ● Real-Time Analysis
            </span>

          </div>

        </div>

      </div>

      {/* =============================================
          QUICK PROMPTS
      ============================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        {prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p.text)}
            className="bg-white p-4 rounded-2xl border hover:bg-blue-50 transition shadow-sm"
          >
            <div className="text-blue-600 text-xl">
              {p.icon}
            </div>

            <p className="text-sm mt-2 font-medium">
              {p.text}
            </p>
          </button>
        ))}

      </div>

      {/* =============================================
          CHAT CONTAINER
      ============================================= */}
      <div className="bg-white rounded-3xl shadow border overflow-hidden">

        {/* =============================================
            CHAT AREA
        ============================================= */}
        <div className="h-[550px] overflow-y-auto p-5 bg-gray-50 space-y-4">

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >

              {/* USER */}
              {msg.type === "user" ? (
                <div className="flex justify-end">

                  <div className="bg-blue-600 text-white p-4 rounded-2xl max-w-md shadow">
                    {msg.text}
                  </div>

                </div>
              ) : (
                // AI
                <div className="flex justify-start">

                  <div className="bg-white p-4 rounded-2xl border max-w-xl shadow-sm">

                    <p className="whitespace-pre-line text-gray-800">
                      {msg.text}
                    </p>

                    {/* =============================================
                        META INFO
                    ============================================= */}
                    {msg.meta && (
                      <div className="mt-4">

                        <div className="flex gap-2 flex-wrap text-xs">

                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            {msg.meta.category}
                          </span>

                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                            {msg.meta.priority}
                          </span>

                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {msg.meta.technician}
                          </span>

                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {msg.meta.confidence}
                          </span>

                        </div>

                        {/* =============================================
                            CREATE TICKET BUTTON
                        ============================================= */}
                        <div className="mt-4 flex flex-wrap gap-3">

                          <button onClick={async () => {
                        try {
                await createEnterpriseTicket({

        formData: {
          title: msg.rawInput.slice(0, 80),

          description: msg.rawInput,

          department: "ICT",

          deviceType: "Unknown",
        },

        user,

        source: "AI Assistant",
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",

          text:
            "✅ Ticket created successfully and assigned automatically.",

          time:
            new Date().toLocaleTimeString(),
        },
      ]);

    } catch (err) {
      console.log(err);
    }
  }}

  className="
    px-4 py-2
    bg-blue-600
    hover:bg-blue-700
    text-white
    rounded-xl
    text-sm
    transition
    shadow-sm
  "
>
  🚀 Create Ticket
</button>

                          {/* AUTO HIGH PRIORITY */}
                          {msg.suggestTicket && (
                            <button
                              onClick={async () => {
                                try {
                                  await createTicketFromAI({
                                    text: msg.rawInput,
                                    user,
                                  });

                                  setMessages((prev) => [
                                    ...prev,
                                    {
                                      type: "ai",
                                      text:
                                        "⚡ High priority ticket auto-created successfully.",
                                      time:
                                        new Date().toLocaleTimeString(),
                                    },
                                  ]);
                                } catch (err) {
                                  console.log(err);
                                }
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700 transition"
                            >
                              ⚡ Auto Create Critical Ticket
                            </button>
                          )}

                        </div>

                      </div>
                    )}

                  </div>

                </div>
              )}

            </motion.div>
          ))}

          {/* =============================================
              AI LOADING
          ============================================= */}
          {loading && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">

              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>

              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></span>

              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>

              AI is analyzing issue...

            </div>
          )}

          <div ref={messagesEndRef}></div>

        </div>

        {/* =============================================
            INPUT AREA
        ============================================= */}
        <div className="p-4 border-t flex gap-3 bg-white">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            className="flex-1 border p-3 rounded-xl focus:ring-2 focus:ring-blue-200"
            placeholder="Describe ICT issue..."
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 transition"
          >
            <FaPaperPlane />
          </button>

        </div>

      </div>

    </div>
  );
};

export default AiAssistant;