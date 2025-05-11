// Sample data for conversations
const conversations = [
  {
    id: 1,
    name: "Elizabeth Bennet",
    picture: "/placeholder.svg?height=50&width=50",
    lastMessage: "I declare after all there is no enjoyment like reading!",
    time: "9:45 AM",
    active: true,
  },
  {
    id: 2,
    name: "Mr. Darcy",
    picture: "/placeholder.svg?height=50&width=50",
    lastMessage: "In vain I have struggled. It will not do. My feelings will not be repressed.",
    time: "Yesterday",
    active: false,
  },
  {
    id: 3,
    name: "Jane Austen",
    picture: "/placeholder.svg?height=50&width=50",
    lastMessage:
      "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.",
    time: "Tuesday",
    active: true,
  },
  {
    id: 4,
    name: "Emily Dickinson",
    picture: "/placeholder.svg?height=50&width=50",
    lastMessage: "Hope is the thing with feathers that perches in the soul.",
    time: "Monday",
    active: false,
  },
  {
    id: 5,
    name: "Oscar Wilde",
    picture: "/placeholder.svg?height=50&width=50",
    lastMessage: "To live is the rarest thing in the world. Most people exist, that is all.",
    time: "Last week",
    active: true,
  },
]

// Sample messages for the current conversation
const messages = [
  {
    id: 1,
    sender: "Elizabeth Bennet",
    text: "I hope you are having a pleasant day. The gardens are particularly beautiful this morning.",
    time: "9:30 AM",
    received: true,
  },
  {
    id: 2,
    sender: "You",
    text: "Indeed, the roses are in full bloom. Would you care to join me for a stroll later?",
    time: "9:35 AM",
    received: false,
  },
  {
    id: 3,
    sender: "Elizabeth Bennet",
    text: "That would be delightful! I have been reading the most fascinating book of poetry and would love to discuss it with you.",
    time: "9:40 AM",
    received: true,
  },
  {
    id: 4,
    sender: "You",
    text: "I look forward to hearing your thoughts. Poetry has a way of expressing what ordinary words cannot.",
    time: "9:42 AM",
    received: false,
  },
  {
    id: 5,
    sender: "Elizabeth Bennet",
    text: "I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book!",
    time: "9:45 AM",
    received: true,
  },
]

// DOM Elements
const conversationsList = document.querySelector(".conversations-list")
const messagesContainer = document.querySelector(".messages-container")
const messageInput = document.querySelector(".message-input")
const sendButton = document.querySelector(".send-button")

// Initialize the app
function initApp() {
  renderConversations()
  renderMessages()
  setupEventListeners()

  // Add entrance animations with slight delay between items
  animateEntranceElements()
}

// Render conversations in the sidebar
function renderConversations() {
  conversationsList.innerHTML = ""

  conversations.forEach((conversation, index) => {
    const conversationEl = document.createElement("div")
    conversationEl.classList.add("conversation-item")
    if (index === 0) conversationEl.classList.add("active")

    conversationEl.innerHTML = `
      <div class="profile-picture ${conversation.active ? "active" : ""}">
        <img src="${conversation.picture}" alt="${conversation.name}">
      </div>
      <div class="conversation-details">
        <h3 class="conversation-name">${conversation.name}</h3>
        <p class="conversation-preview">${conversation.lastMessage}</p>
        <span class="conversation-time">${conversation.time}</span>
      </div>
    `

    conversationEl.dataset.id = conversation.id
    conversationEl.style.animationDelay = `${index * 0.1}s`
    conversationsList.appendChild(conversationEl)
  })
}

// Render messages in the chat area
function renderMessages() {
  messagesContainer.innerHTML = ""

  messages.forEach((message, index) => {
    const messageEl = document.createElement("div")
    messageEl.classList.add("message")
    messageEl.classList.add(message.received ? "received" : "sent")

    messageEl.innerHTML = `
      <p class="message-text">${message.text}</p>
      <span class="message-time">${message.time}</span>
    `

    messageEl.style.animationDelay = `${index * 0.1}s`
    messagesContainer.appendChild(messageEl)
  })

  // Scroll to the bottom of the messages
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

// Set up event listeners
function setupEventListeners() {
  // Send message on button click
  sendButton.addEventListener("click", sendMessage)

  // Send message on Enter key (but allow Shift+Enter for new line)
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  // Auto-resize textarea as user types
  messageInput.addEventListener("input", () => {
    messageInput.style.height = "auto"
    messageInput.style.height = messageInput.scrollHeight + "px"
  })

  // Switch conversations when clicking on a conversation item
  conversationsList.addEventListener("click", (e) => {
    const conversationItem = e.target.closest(".conversation-item")
    if (conversationItem) {
      document.querySelectorAll(".conversation-item").forEach((item) => {
        item.classList.remove("active")
      })
      conversationItem.classList.add("active")

      // In a real app, you would load the messages for this conversation
      // For now, we'll just scroll to the bottom of the current messages
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  })

  // Handle responsive sidebar toggle
  if (window.innerWidth <= 768) {
    const sidebar = document.querySelector(".sidebar")
    const chatHeader = document.querySelector(".chat-header")

    // Create toggle button if it doesn't exist
    if (!document.querySelector(".toggle-sidebar")) {
      const toggleButton = document.createElement("button")
      toggleButton.classList.add("toggle-sidebar")
      toggleButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `

      chatHeader.appendChild(toggleButton)

      toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("hidden")
      })

      // Hide sidebar initially on mobile
      sidebar.classList.add("hidden")
    }
  }
}

// Send a new message
function sendMessage() {
  const text = messageInput.value.trim()
  if (!text) return

  // new message
  const newMessage = {
    id: messages.length + 1,
    sender: "You",
    text: text,
    time: getCurrentTime(),
    received: false,
  }

  messages.push(newMessage)
  messageInput.value = ""
  messageInput.style.height = "auto"

  renderMessages()
  setTimeout(
    () => {
      simulateReply()
    },
    1000 + Math.random() * 2000,
  )
}

function simulateReply() {
  const replies = [
    "How fascinating! I had not considered that perspective before.",
    "Indeed, the beauty of language is in its ability to convey the deepest emotions.",
    "I find myself in complete agreement with your sentiment.",
    "What a delightful observation! It reminds me of a passage I read recently.",
    "Your words have a poetic quality that I find most refreshing.",
  ]

  const randomReply = replies[Math.floor(Math.random() * replies.length)]

  const newReply = {
    id: messages.length + 1,
    sender: "Elizabeth Bennet",
    text: randomReply,
    time: getCurrentTime(),
    received: true,
  }

  messages.push(newReply)
  renderMessages()
}

function getCurrentTime() {
  const now = new Date()
  let hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const ampm = hours >= 12 ? "PM" : "AM"

  hours = hours % 12
  hours = hours ? hours : 12 

  return `${hours}:${minutes} ${ampm}`
}

function animateEntranceElements() {
  const elements = document.querySelectorAll(".conversation-item, .message")

  elements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"

    setTimeout(
      () => {
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      },
      100 + index * 100,
    )
  })
}

document.addEventListener("DOMContentLoaded", initApp)

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const sidebar = document.querySelector(".sidebar")
    sidebar.classList.remove("hidden")
  }
})
