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
    this.setupDebugMode();
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
      
      // Store the prompt for later use
      this.deferredPrompt = deferredPrompt;
      
      // Show install button only if it doesn't already exist
      if (!document.getElementById('pwaInstallBtn')) {
        const installBtn = document.createElement('button');
        installBtn.id = 'pwaInstallBtn';
        installBtn.className = 'btn btn-outline-primary btn-sm';
        installBtn.innerHTML = '<i class="bi bi-download"></i> Install App';
        installBtn.onclick = () => this.installApp();
        
        // Add to header controls
        const headerControls = document.querySelector('.header-controls');
        if (headerControls) {
          headerControls.appendChild(installBtn);
        }
      }
    });
  },

  // Install PWA
  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          Utils.showNotification('ACCA Agent installed successfully!', 'success');
        }
        this.deferredPrompt = null;
        
        // Remove the install button after use
        const installBtn = document.getElementById('pwaInstallBtn');
        if (installBtn) {
          installBtn.remove();
        }
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
      // Use relative path for GitHub Pages compatibility
      navigator.serviceWorker.register('./sw.js').then(registration => {
        console.log('SW registered:', registration);
        Utils.showNotification('ACCA Agent is ready for offline use!', 'success');
      }).catch(error => {
        console.error('SW registration failed:', error);
        // Don't show error notification for service worker issues
        // as they're not critical for basic functionality
      });
    }
  },

  // Setup debug mode (show debug button in development)
  setupDebugMode() {
    // Show debug button in development or when there are API issues
    const debugBtn = document.getElementById('debugBtn');
    if (debugBtn) {
      // Show debug button if we're on localhost or if there are console errors
      const isLocalhost = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('localhost');
      
      if (isLocalhost || window.location.hostname.includes('github.io')) {
        debugBtn.style.display = 'inline-block';
        console.log('🐛 Debug mode enabled - Debug button visible');
      }
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
