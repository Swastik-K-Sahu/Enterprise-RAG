import { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hello! How can I help you?', isBot: true }]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const bottomRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');

    setIsBotTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setIsBotTyping(false);

      setMessages(prev => [...prev, { text: data.response || 'Sorry, I did not understand.', isBot: true }]);
    } catch (error) {
      setIsBotTyping(false);
      setMessages(prev => [...prev, { text: 'Error fetching response. Please try again.', isBot: true }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isBotTyping]);

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none text-xl"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="fixed mr-5 mb-5 bottom-0 right-0 bg-white shadow-lg rounded-lg w-96 h-[600px] flex flex-col">

          <div className="bg-blue-500 text-white p-2 flex justify-between items-center rounded-t-lg">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              onClick={toggleChat}
              className="text-white text-xl hover:text-gray-200 focus:outline-none"
            >
              &#x2715;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 bg-gray-100">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 ${msg.isBot ? 'text-left' : 'text-right'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.isBot ? 'bg-blue-100' : 'bg-green-100'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            {isBotTyping && (
              <div className="p-2 text-left">
                <span className="inline-block p-2 rounded-lg bg-blue-100">Bot is typing...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="flex p-2 border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
