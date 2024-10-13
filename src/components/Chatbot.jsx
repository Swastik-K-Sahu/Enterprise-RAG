import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);  // To toggle chatbot open/close
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to toggle chatbot window
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle user input and bot responses
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chatbot Icon - Can be replaced with an actual chat icon */}
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        💬 {/* Emoji as a placeholder for chat icon */}
      </button>

      {/* Chatbot window (only shown if isOpen is true) */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Chat with us!</h4>
            <button onClick={toggleChatbot}>✖️</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="loading">Bot is typing...</div>}
          </div>
          <form onSubmit={handleSubmit} className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              required
            />
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;