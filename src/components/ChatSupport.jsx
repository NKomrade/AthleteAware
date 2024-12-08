import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, User } from 'lucide-react'

const initialMessages = [
  { id: 1, text: "Hello! How can I assist you with anti-doping information today?", sender: 'bot' },
];

const botResponses = {
  "what is doping": "Doping refers to the use of prohibited substances or methods to improve athletic performance. This practice is banned in sports to ensure fair competition and protect athletes' health.",
  "what is doping in sports": "Doping refers to the use of prohibited substances or methods to improve athletic performance. This practice is banned in sports to ensure fair competition and protect athletes' health.",
  "prohibited substances": "Prohibited substances in sports include anabolic steroids, stimulants, hormones, and narcotics. The World Anti-Doping Agency (WADA) maintains a comprehensive list that is updated annually.",
  "testing procedures": "Anti-doping testing procedures typically involve collecting urine or blood samples from athletes. These samples are then analyzed in accredited laboratories for the presence of prohibited substances.",
  "consequences": "The consequences of doping can include disqualification from competitions, loss of medals or titles, financial penalties, and bans from future participation in sports. It can also have serious health implications.",
  "therapeutic use exemption": "A Therapeutic Use Exemption (TUE) allows an athlete to use a prohibited substance for legitimate medical reasons. Athletes must apply for a TUE and provide medical documentation to support their need.",
};

export default function ChatSupportComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(input.toLowerCase());
        const botMessage = { id: messages.length + 2, text: botResponse, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  const getBotResponse = (userInput) => {
    for (const [key, value] of Object.entries(botResponses)) {
      if (userInput.includes(key)) {
        return value;
      }
    }
    return "I'm sorry, I don't have specific information about that. Can you try rephrasing your question or ask about a different topic related to anti-doping?";
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gray-900 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-black">
          <div className="bg-black text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-bold">Athlete Support</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg p-2 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 mr-2" />
                    ) : (
                      <MessageCircle className="h-4 w-4 mr-2" />
                    )}
                    <span className="font-bold">
                      {message.sender === 'user' ? 'You' : 'Bot'}
                    </span>
                  </div>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-black">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 bg-white text-black border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <button
                onClick={handleSend}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}