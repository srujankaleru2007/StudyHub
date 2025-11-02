import React, { useState, useRef, useEffect } from 'react'
import './ChatBot.css'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm your StudyHub assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const botResponses = {
    greetings: [
      "Hello! How can I assist you with your study session?",
      "Hi there! Ready to boost your productivity?",
      "Hey! Let's make today productive! 🚀"
    ],
    help: [
      "I can help you with:\n• Understanding features\n• Task management tips\n• Pomodoro technique\n• Productivity advice\n• Using the music player\nWhat would you like to know?",
    ],
    pomodoro: [
      "The Pomodoro Technique helps you focus by breaking work into 25-minute intervals (or custom durations) with short breaks. Start the timer when you begin studying, and take breaks when it completes!",
    ],
    tasks: [
      "To add tasks:\n1. Click the + button\n2. Fill in the task details\n3. Set priority and deadline\n4. Click 'Add Task'\n\nPro tip: Use priorities to organize your work better!",
    ],
    music: [
      "The binaural beats player uses specific frequencies to enhance focus:\n• 40Hz - Deep focus (best for coding/studying)\n• 20Hz - General focus\n• 12Hz - Light meditation\n• 8Hz - Relaxation\n• 6Hz - Deep meditation\nTry 40Hz for maximum concentration!",
    ],
    focus: [
      "Focus Mode creates a distraction-free environment:\n• Hides unnecessary UI\n• Shows only timer, music, and today's tasks\n• Perfect for deep work sessions\nClick the 'Focus Mode' button in the header to activate!",
    ],
    default: [
      "I'm here to help! Try asking about:\n• Pomodoro technique\n• Task management\n• Music/focus\n• Features\n• Productivity tips",
    ]
  }

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)]
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return botResponses.help[0]
    }
    if (lowerMessage.includes('pomodoro') || lowerMessage.includes('timer')) {
      return botResponses.pomodoro[0]
    }
    if (lowerMessage.includes('task') || lowerMessage.includes('todo') || lowerMessage.includes('add')) {
      return botResponses.tasks[0]
    }
    if (lowerMessage.includes('music') || lowerMessage.includes('binaural') || lowerMessage.includes('beat')) {
      return botResponses.music[0]
    }
    if (lowerMessage.includes('focus') || lowerMessage.includes('distraction')) {
      return botResponses.focus[0]
    }
    if (lowerMessage.includes('feature') || lowerMessage.includes('what') || lowerMessage.includes('how')) {
      return botResponses.default[0]
    }
    
    return botResponses.default[0]
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "How does Pomodoro work?",
    "How to add tasks?",
    "Tell me about music",
    "What is Focus Mode?"
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  return (
    <>
      {!isOpen && (
        <button 
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          title="Open Chatbot"
        >
          <span className="chat-icon">💬</span>
          <span className="chat-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <span className="bot-avatar">🤖</span>
              <div>
                <h3>StudyHub Assistant</h3>
                <p>Always here to help!</p>
              </div>
            </div>
            <button 
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="quick-questions">
              <p>Quick questions:</p>
              <div className="quick-questions-grid">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    className="quick-question-btn"
                    onClick={() => handleQuickQuestion(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="chatbot-send"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot

