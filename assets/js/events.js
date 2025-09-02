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
    
    // Debug button (only show in development)
    const debugBtn = document.getElementById('debugBtn');
    if (debugBtn) {
      debugBtn.addEventListener('click', () => this.handleDebugClick());
    }
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
  },

  // Handle debug button click
  async handleDebugClick() {
    try {
      console.log('🔍 Debug: Testing API connection...');
      
      // Show debug button as loading
      const debugBtn = document.getElementById('debugBtn');
      const originalText = debugBtn.innerHTML;
      debugBtn.innerHTML = '<i class="bi bi-hourglass-split"></i>';
      debugBtn.disabled = true;
      
      // Test API connection
      const result = await API.testConnection();
      
      if (result.success) {
        console.log('✅ API Test Successful:', result.data);
        Utils.showNotification('API connection successful! Check console for details.', 'success');
      } else {
        console.log('❌ API Test Failed:', result);
        Utils.showNotification(`API test failed: ${result.error}`, 'error');
      }
      
      // Restore button
      debugBtn.innerHTML = originalText;
      debugBtn.disabled = false;
      
    } catch (error) {
      console.error('Debug Error:', error);
      const debugBtn = document.getElementById('debugBtn');
      debugBtn.innerHTML = '<i class="bi bi-bug"></i>';
      debugBtn.disabled = false;
      Utils.showNotification('Debug test failed. Check console for details.', 'error');
    }
  }
};

// Export for use in other modules
window.EventManager = EventManager;
