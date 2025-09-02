// Storage Management
const Storage = {
  // Save chat history
  saveChatHistory(chatHistory) {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  },

  // Load chat history
  loadChatHistory() {
    const stored = localStorage.getItem('chatHistory');
    return stored ? JSON.parse(stored) : [];
  },

  // Save pinned messages
  savePinnedMessages(pinnedItems) {
    localStorage.setItem('pinnedMessages', JSON.stringify(pinnedItems));
  },

  // Load pinned messages
  loadPinnedMessages() {
    const stored = localStorage.getItem('pinnedMessages');
    return stored ? JSON.parse(stored) : [];
  },

  // Save theme preference
  saveTheme(isDark) {
    localStorage.setItem('darkMode', isDark);
  },

  // Load theme preference
  loadTheme() {
    return localStorage.getItem('darkMode') === 'true';
  },

  // Save custom theme
  saveCustomTheme(theme) {
    localStorage.setItem('customTheme', JSON.stringify(theme));
  },

  // Load custom theme
  loadCustomTheme() {
    const stored = localStorage.getItem('customTheme');
    return stored ? JSON.parse(stored) : null;
  },

  // Save message ratings
  saveMessageRating(messageId, rating) {
    const ratings = JSON.parse(localStorage.getItem('messageRatings') || '{}');
    ratings[messageId] = rating;
    localStorage.setItem('messageRatings', JSON.stringify(ratings));
  },

  // Get message rating
  getMessageRating(messageId) {
    const ratings = JSON.parse(localStorage.getItem('messageRatings') || '{}');
    return ratings[messageId];
  },

  // Track usage analytics
  trackUsage(action, data = {}) {
    const usage = JSON.parse(localStorage.getItem('usage') || '{}');
    const today = new Date().toDateString();
    
    if (!usage[today]) {
      usage[today] = {};
    }
    
    if (!usage[today][action]) {
      usage[today][action] = 0;
    }
    
    usage[today][action]++;
    
    localStorage.setItem('usage', JSON.stringify(usage));
  },

  // Get usage statistics
  getUsageStats() {
    const usage = JSON.parse(localStorage.getItem('usage') || '{}');
    const today = new Date().toDateString();
    
    return {
      today: usage[today] || {},
      total: Object.values(usage).reduce((total, day) => {
        Object.entries(day).forEach(([action, count]) => {
          total[action] = (total[action] || 0) + count;
        });
        return total;
      }, {})
    };
  },

  // Clear all data
  clearAll() {
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('pinnedMessages');
    localStorage.removeItem('messageRatings');
    localStorage.removeItem('usage');
    localStorage.removeItem('customTheme');
  }
};

// Export for use in other modules
window.Storage = Storage;
