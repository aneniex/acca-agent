// Main Application Controller
const App = {
  // Initialize the application
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  },

  // Initialize all modules
  initializeApp() {
    // Initialize UI elements cache
    UI.initElements();
    
    // Initialize all managers
    ChatManager.init();
    PinnedManager.init();
    SpeechManager.init();
    EventManager.init();
    
    // Apply stored theme
    UI.applyStoredTheme();
    
    // Load shared conversation if present
    ExportManager.loadSharedConversation();
    
    // Initialize advanced features
    this.initializeAdvancedFeatures();
    
    // Track page load
    Storage.trackUsage('pageLoad');
    
    console.log('ACCA Agent initialized successfully');
  },

  // Initialize advanced features
  initializeAdvancedFeatures() {
    this.loadCustomTheme();
    this.setupPWAInstall();
    this.addHelpButton();
    this.registerServiceWorker();
  },

  // Load custom theme
  loadCustomTheme() {
    const theme = Storage.loadCustomTheme();
    if (theme) {
      this.applyCustomTheme(theme);
    }
  },

  // Apply custom theme
  applyCustomTheme(theme) {
    const root = document.documentElement;
    
    Object.entries(theme).forEach(([property, value]) => {
      root.style.setProperty(`--${property}`, value);
    });
  },

  // Setup PWA install prompt
  setupPWAInstall() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install button
      const installBtn = document.createElement('button');
      installBtn.className = 'btn btn-outline-primary btn-sm';
      installBtn.innerHTML = '<i class="bi bi-download"></i> Install App';
      installBtn.onclick = () => this.installApp(deferredPrompt);
      
      document.querySelector('.header-controls').appendChild(installBtn);
    });
  },

  // Install PWA
  installApp(deferredPrompt) {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          Utils.showNotification('ACCA Agent installed successfully!', 'success');
        }
        deferredPrompt = null;
      });
    }
  },

  // Add help button to quick replies
  addHelpButton() {
    const helpBtn = document.createElement('button');
    helpBtn.className = 'btn btn-sm btn-outline-secondary quick-reply-btn';
    helpBtn.innerHTML = '<i class="bi bi-question-circle"></i> Help';
    helpBtn.onclick = () => ChatManager.showKeyboardShortcuts();
    document.getElementById('quickReplies').appendChild(helpBtn);
  },

  // Register service worker
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered:', registration);
        Utils.showNotification('ACCA Agent is ready for offline use!', 'success');
      }).catch(error => {
        console.error('SW registration failed:', error);
      });
    }
  }
};

// Global functions for onclick handlers
window.sendMessage = (msg) => ChatManager.sendMessage(msg);
window.downloadChat = (format) => ExportManager.downloadChat(format);
window.closeModal = (modalId) => UI.closeModal(modalId);
window.copyShareUrl = () => ExportManager.copyShareUrl();
window.clearPinnedMessages = () => PinnedManager.clearPinnedMessages();
window.unpinMessage = (messageId) => PinnedManager.unpinMessage(messageId);

// Initialize the app
App.init();
