// Event Handlers and Keyboard Shortcuts
const EventManager = {
  // Initialize event listeners
  init() {
    this.setupInputEvents();
    this.setupButtonEvents();
    this.setupKeyboardShortcuts();
    this.setupModalEvents();
  },

  // Setup input-related events
  setupInputEvents() {
    UI.elements.userInput.addEventListener('input', () => UI.handleInputChange());
    UI.elements.userInput.addEventListener('keydown', this.handleInputKeyDown);
    UI.elements.searchInput.addEventListener('input', () => SearchManager.handleSearch());
  },

  // Setup button events
  setupButtonEvents() {
    document.getElementById('toggleDark').addEventListener('click', () => UI.toggleDarkMode());
    document.getElementById('newChatBtn').addEventListener('click', () => ChatManager.startNewChat());
    document.getElementById('downloadBtn').addEventListener('click', () => ExportManager.showDownloadModal());
    document.getElementById('shareBtn').addEventListener('click', () => ExportManager.showShareModal());
    document.getElementById('searchBtn').addEventListener('click', () => UI.toggleSearch());
    document.getElementById('voiceBtn').addEventListener('click', () => SpeechManager.toggleVoiceInput());
    document.getElementById('sendBtn').addEventListener('click', () => ChatManager.sendMessage());
  },

  // Setup keyboard shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', this.handleGlobalKeyboard);
  },

  // Setup modal events
  setupModalEvents() {
    document.addEventListener('click', this.handleModalClose);
  },

  // Handle input field key events
  handleInputKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ChatManager.sendMessage();
    }
  },

  // Handle global keyboard shortcuts
  handleGlobalKeyboard(e) {
    // Ctrl+Enter or Cmd+Enter to send
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      ChatManager.sendMessage();
    }
    
    // Ctrl+K or Cmd+K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      UI.toggleSearch();
    }
    
    // Escape to close modals or search
    if (e.key === 'Escape') {
      UI.closeAllModals();
      if (UI.elements.searchContainer.style.display !== 'none') {
        UI.toggleSearch();
      }
    }
  },

  // Handle modal close on background click
  handleModalClose(e) {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('show');
    }
  }
};

// Export for use in other modules
window.EventManager = EventManager;
