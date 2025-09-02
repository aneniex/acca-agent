// UI Management
const UI = {
  // DOM elements cache
  elements: {},

  // Initialize DOM element cache
  initElements() {
    this.elements = {
      chatMessages: document.getElementById('chatMessages'),
      userInput: document.getElementById('userInput'),
      sendBtn: document.getElementById('sendBtn'),
      introMessage: document.getElementById('introMessage'),
      contextIndicator: document.getElementById('contextIndicator'),
      pinnedMessages: document.getElementById('pinnedMessages'),
      pinnedList: document.getElementById('pinnedList'),
      searchInput: document.getElementById('searchInput'),
      searchContainer: document.querySelector('.search-container')
    };
  },

  // Show/hide intro message
  showIntroMessage() {
    if (this.elements.introMessage) {
      this.elements.introMessage.style.display = 'block';
    }
  },

  hideIntroMessage() {
    if (this.elements.introMessage) {
      this.elements.introMessage.style.display = 'none';
    }
  },

  // Show/hide context indicator
  showContextIndicator() {
    if (this.elements.contextIndicator) {
      this.elements.contextIndicator.style.display = 'flex';
      setTimeout(() => {
        this.elements.contextIndicator.style.display = 'none';
      }, 3000);
    }
  },

  // Handle input changes
  handleInputChange() {
    const userInput = this.elements.userInput;
    const sendBtn = this.elements.sendBtn;
    
    // Auto-resize textarea
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
    
    // Update send button state
    const hasText = userInput.value.trim().length > 0;
    sendBtn.disabled = !hasText || ChatManager.isLoading;
  },

  // Create action button
  createActionButton(iconClass, title, onClick) {
    const btn = document.createElement('button');
    btn.className = 'action-btn';
    btn.title = title;
    btn.innerHTML = `<i class="bi ${iconClass}"></i>`;
    btn.onclick = onClick;
    return btn;
  },

  // Create rating button
  createRatingButton(iconClass, type, messageId) {
    const btn = document.createElement('button');
    btn.className = `rating-btn ${type}`;
    btn.innerHTML = `<i class="bi ${iconClass}"></i>`;
    btn.onclick = () => MessageManager.rateMessage(messageId, type);
    return btn;
  },

  // Make content expandable (default expanded)
  makeExpandable(content, messageDiv) {
    content.classList.add('expandable-content');
    
    const expandBtn = document.createElement('button');
    expandBtn.className = 'expand-btn';
    expandBtn.textContent = 'Show less';
    expandBtn.onclick = () => {
      if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        expandBtn.textContent = 'Show less';
      } else {
        content.classList.add('collapsed');
        expandBtn.textContent = 'Show more';
      }
    };
    
    messageDiv.appendChild(expandBtn);
  },

  // Show loading indicator
  showLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    loadingDiv.id = 'loadingIndicator';
    loadingDiv.innerHTML = `
      <div class="avatar bot-avatar">
        <i class="bi bi-robot"></i>
      </div>
      <div>
        <span>ACCA Agent is thinking</span>
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    
    this.elements.chatMessages.appendChild(loadingDiv);
    Utils.scrollToBottom();
  },

  // Hide loading indicator
  hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loadingIndicator');
    if (loadingDiv) {
      loadingDiv.remove();
    }
  },

  // Toggle dark mode
  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    Storage.saveTheme(isDark);
    
    const icon = document.getElementById('toggleDark').querySelector('i');
    icon.className = isDark ? 'bi bi-sun' : 'bi bi-moon';
  },

  // Apply stored theme
  applyStoredTheme() {
    const isDark = Storage.loadTheme();
    if (isDark) {
      document.body.classList.add('dark-mode');
      const toggleBtn = document.getElementById('toggleDark');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
      }
    }
  },

  // Toggle search
  toggleSearch() {
    const isVisible = this.elements.searchContainer.style.display !== 'none';
    this.elements.searchContainer.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
      this.elements.searchInput.focus();
    } else {
      this.elements.searchInput.value = '';
      SearchManager.clearSearch();
    }
  },

  // Show modal
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  },

  // Close modal
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
    }
  },

  // Close all modals
  closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.remove('show');
    });
  }
};

// Export for use in other modules
window.UI = UI;
