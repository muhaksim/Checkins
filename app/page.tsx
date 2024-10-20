// app/page.tsx
"use client";

import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import Vapi from "@vapi-ai/web";

export default function Home() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const userName = "Muhammad Abdullahi"; // Replace with actual user name
  const [vapi, setVapi] = useState<Vapi | null>(null);

  const startCall = async () => {
    setIsStarting(true);
    const vapiInstance = new Vapi(
      process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ""
    );
    setVapi(vapiInstance);

    try {
      const assistantOverrides = {
        variableValues: {
          name: userName,
        },
      };

      await vapiInstance.start(
        process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "",
        assistantOverrides
      );
      setIsCallActive(true);
      setIsStarting(false);
    } catch (error) {
      console.error("Failed to start call:", error);
      setIsStarting(false);
    }
  };

  const stopCall = async () => {
    if (vapi) {
      vapi.stop();
      setIsCallActive(false);
      setIsAISpeaking(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
      <h1 className="text-4xl font-bold text-white mb-8">
        Welcome, {userName}!
      </h1>
      {isStarting ? (
        <div className="text-white text-xl mb-4">Starting session...</div>
      ) : (
        <>
          <button
            onClick={isCallActive ? stopCall : startCall}
            className={`w-32 h-32 rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 ${
              isCallActive ? "animate-pulse" : ""
            }`}
          >
            {isCallActive ? (
              <MicOff className="w-16 h-16 mx-auto text-red-500" />
            ) : (
              <Mic className="w-16 h-16 mx-auto text-purple-500" />
            )}
          </button>
          <p className="mt-4 text-white text-xl">
            {isCallActive
              ? isAISpeaking
                ? "AI is speaking..."
                : "Listening..."
              : "Start the call now!"}
          </p>
        </>
      )}
    </div>
  );
}
