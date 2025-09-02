// Chat Management
const ChatManager = {
  chatHistory: [],
  conversationContext: [],
  isLoading: false,
  lastBotMessageId: null,

  // Initialize chat
  init() {
    this.loadChatHistory();
    this.setupMarkdownRenderer();
    
    if (this.chatHistory.length === 0) {
      UI.showIntroMessage();
    } else {
      UI.hideIntroMessage();
    }
  },

  // Setup markdown renderer
  setupMarkdownRenderer() {
    marked.setOptions({
      highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(code, { language: lang }).value;
          } catch (err) {}
        }
        return hljs.highlightAuto(code).value;
      },
      breaks: true,
      gfm: true
    });
  },

  // Load chat history from storage
  loadChatHistory() {
    this.chatHistory = Storage.loadChatHistory();
    this.chatHistory.forEach(msg => MessageManager.renderMessage(msg, false));
  },

  // Save chat history to storage
  saveChatHistory() {
    Storage.saveChatHistory(this.chatHistory);
  },

  // Send message
  async sendMessage(text = null) {
    const message = text || UI.elements.userInput.value.trim();
    if (!message || this.isLoading) return;

    UI.hideIntroMessage();
    
    // Create user message
    const userMsg = {
      id: Utils.generateId(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
      isUser: true
    };
    
    // Add to history and render
    this.chatHistory.push(userMsg);
    MessageManager.renderMessage(userMsg);
    this.saveChatHistory();
    
    // Clear input
    UI.elements.userInput.value = '';
    UI.handleInputChange();
    
    // Check canned responses before API
    const canned = window.CannedResponses && CannedResponses.getReply(message);
    if (canned) {
      const botMsg = {
        id: Utils.generateId(),
        text: canned,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isUser: false
      };
      this.chatHistory.push(botMsg);
      MessageManager.renderMessage(botMsg);
      this.saveChatHistory();
      this.lastBotMessageId = botMsg.id;
      this.updateConversationContext(message);
      return;
    }
    
    // Show loading indicator
    this.isLoading = true;
    UI.elements.sendBtn.disabled = true;
    UI.showLoadingIndicator();
    
    // Update conversation context
    this.updateConversationContext(message);
    
    // Get response from API
    const reply = await API.sendMessage(message);
    
    // Hide loading indicator
    this.isLoading = false;
    UI.hideLoadingIndicator();
    UI.handleInputChange();
    
    // Create bot message
    const botMsg = {
      id: Utils.generateId(),
      text: reply,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      isUser: false
    };
    
    // Add to history and render
    this.chatHistory.push(botMsg);
    MessageManager.renderMessage(botMsg);
    this.saveChatHistory();
    
    this.lastBotMessageId = botMsg.id;
    
    // Show context indicator if continuing conversation
    if (this.conversationContext.length > 1) {
      UI.showContextIndicator();
    }
    
    // Track usage
    Storage.trackUsage('messageSent');
  },

  // Update conversation context
  updateConversationContext(message) {
    this.conversationContext.push(message);
    if (this.conversationContext.length > CONFIG.MAX_CONTEXT_MESSAGES) {
      this.conversationContext = this.conversationContext.slice(-CONFIG.MAX_CONTEXT_MESSAGES);
    }
  },

  // Start new chat
  startNewChat() {
    if (this.chatHistory.length === 0) return;
    
    if (confirm('Start a new chat? This will clear your current conversation.')) {
      this.chatHistory = [];
      this.conversationContext = [];
      this.saveChatHistory();
      
      // Clear messages from UI
      const messages = UI.elements.chatMessages.querySelectorAll('.message-wrapper, .loading-indicator');
      messages.forEach(msg => msg.remove());
      
      // Show intro
      UI.showIntroMessage();
      
      Utils.showNotification('New chat started', 'success');
      Storage.trackUsage('newChatStarted');
    }
  },

  // Show keyboard shortcuts help
  showKeyboardShortcuts() {
    const shortcuts = [
      { key: 'Enter', action: 'Send message' },
      { key: 'Shift + Enter', action: 'New line in message' },
      { key: 'Ctrl/Cmd + Enter', action: 'Send message (alternative)' },
      { key: 'Ctrl/Cmd + K', action: 'Search chat history' },
      { key: 'Escape', action: 'Close modals/search' }
    ];
    
    const helpText = shortcuts.map(s => `**${s.key}**: ${s.action}`).join('\n');
    
    const helpMsg = {
      id: Utils.generateId(),
      text: `## Keyboard Shortcuts\n\n${helpText}\n\nThese shortcuts will help you navigate ACCA Agent more efficiently!`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      isUser: false
    };
    
    this.chatHistory.push(helpMsg);
    MessageManager.renderMessage(helpMsg);
    this.saveChatHistory();
  }
};

// Export for use in other modules
window.ChatManager = ChatManager;
