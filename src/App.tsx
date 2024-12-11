import React, { useState } from 'react';
import { ChatContainer } from './components/Chat/ChatContainer';
import { useChat } from './hooks/useChat';
import { Bot, Droplets } from 'lucide-react';

function App() {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-blue-600 text-white py-4 shadow-md animate-slideDown">
        <div className="max-w-3xl mx-auto px-4 flex items-center gap-3">
          <div className="relative animate-pulse">
            <Bot className="w-10 h-10 text-white" />
            <Droplets className="w-5 h-5 text-cyan-300 absolute -bottom-1 -right-1" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Bhujal.io</h1>
            <p className="text-sm text-blue-200">Your Groundwater Assistant</p>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {messages.length === 0 ? (
          <div className="text-center space-y-6 max-w-md animate-fadeIn">
            <div className="relative mx-auto w-fit">
              <Bot className="w-14 h-14 text-purple-600 animate-bounce" />
              <Droplets className="w-6 h-6 text-blue-500 absolute -bottom-2 -right-2 animate-spin-slow" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome to Groundwater Assistant</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ask me anything about groundwater! I can help you with topics like aquifers, water quality, and more.
            </p>
            <div className="grid gap-3 mt-4">
              {['What are the main types of aquifers?', 
                'How does groundwater recharge work?', 
                'What factors affect groundwater quality?'].map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="block w-full p-4 bg-purple-100 text-purple-700 rounded-lg shadow-md hover:bg-purple-200 hover:scale-105 transition-transform"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 w-full max-w-3xl p-4 animate-fadeIn">
            <ChatContainer messages={messages} isLoading={isLoading} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="bg-white py-4 border-t shadow-md animate-slideUp">
        <div className="max-w-3xl mx-auto px-4 flex items-center gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            className="flex-1 p-3 text-lg rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none resize-none"
            placeholder="Type your message here..."
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className={`px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-md hover:bg-purple-700 transition-transform transform hover:scale-110 disabled:opacity-50 ${
              inputValue.trim() ? '' : 'cursor-not-allowed'
            }`}
            disabled={isLoading || !inputValue.trim()}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;