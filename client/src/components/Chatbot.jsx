import { useState, useRef, useEffect } from "react";
import { chatWithAI, getRecommendations } from "../services/aiService";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hello! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect if user is asking about products
  const isProductQuestion = (text) => {
    const productKeywords = [
      'recommend', 'show', 'find', 'looking for', 'want', 'need',
      'buy', 'purchase', 'get', 'search', 'available', 'have',
      'product', 'item', 'watch', 'phone', 'mobile', 'clothes',
      'shoe', 'basket', 'men', 'women', 'kid', 'children'
    ];
    
    const lowerText = text.toLowerCase();
    return productKeywords.some(keyword => lowerText.includes(keyword));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      // Check if it's a product-related question
      if (isProductQuestion(currentInput)) {
        // Use smart AI recommendation
        const data = await getRecommendations(currentInput);
        
        if (data.success && data.products && data.products.length > 0) {
          let responseText = data.aiMessage + "\n\n";
          
          data.products.forEach((product, index) => {
            responseText += `${index + 1}. ${product.name}\n`;
            responseText += `   💰 Price: ${product.price}dt\n`;
            if (product.description) {
              const desc = product.description.length > 80 
                ? product.description.substring(0, 80) + '...'
                : product.description;
              responseText += `   📝 ${desc}\n`;
            }
            responseText += `\n`;
          });
          
          if (data.detectedCategory) {
            responseText += `\n✨ Showing results for: ${data.detectedCategory}`;
          }
          
          setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
        } else {
          setMessages((prev) => [...prev, { 
            role: "assistant", 
            content: data.message || "Sorry, I couldn't find any matching products."
          }]);
        }
      } else {
        // General AI chat
        const data = await chatWithAI(currentInput);
        
        if (data.success) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
        }
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action) => {
    setInput(action);
    setTimeout(handleSend, 100);
  };

  return (
    <>
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Customer Support</h4>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.role === "user" ? "user-message" : "assistant-message"
                }`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {msg.content}
              </div>
            ))}
            
            {messages.length === 1 && !loading && (
              <div className="quick-actions">
                <button 
                  className="quick-action-btn"
                  onClick={() => handleQuickAction("Show me some watches")}
                >
                  Show me watches
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={() => handleQuickAction("I need a phone")}
                >
                  I need a phone
                </button>
              </div>
            )}
            
            {loading && (
              <div className="message assistant-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;