// Pinned Messages Management
const PinnedManager = {
  pinnedItems: [],

  // Initialize pinned messages
  init() {
    this.pinnedItems = Storage.loadPinnedMessages();
    this.renderPinnedMessages();
  },

  // Pin a message
  pinMessage(message) {
    const existing = this.pinnedItems.find(item => item.id === message.id);
    if (existing) {
      Utils.showNotification('Message is already pinned', 'info');
      return;
    }
    
    this.pinnedItems.push({
      id: message.id,
      text: message.text.substring(0, 100) + (message.text.length > 100 ? '...' : ''),
      fullText: message.text,
      timestamp: message.timestamp
    });
    
    Storage.savePinnedMessages(this.pinnedItems);
    this.renderPinnedMessages();
    Utils.showNotification('Message pinned!', 'success');
  },

  // Unpin a message
  unpinMessage(messageId) {
    this.pinnedItems = this.pinnedItems.filter(item => item.id !== messageId);
    Storage.savePinnedMessages(this.pinnedItems);
    this.renderPinnedMessages();
    Utils.showNotification('Message unpinned', 'info');
  },

  // Clear all pinned messages
  clearPinnedMessages() {
    this.pinnedItems = [];
    Storage.savePinnedMessages(this.pinnedItems);
    this.renderPinnedMessages();
    Utils.showNotification('All pinned messages cleared', 'info');
  },

  // Render pinned messages UI
  renderPinnedMessages() {
    if (this.pinnedItems.length === 0) {
      UI.elements.pinnedMessages.classList.remove('has-pins');
      return;
    }
    
    UI.elements.pinnedMessages.classList.add('has-pins');
    UI.elements.pinnedList.innerHTML = '';
    
    this.pinnedItems.forEach(item => {
      const pinnedItem = document.createElement('div');
      pinnedItem.className = 'pinned-item';
      pinnedItem.innerHTML = `
        <span>${item.text}</span>
        <button class="btn btn-sm btn-outline-danger" onclick="PinnedManager.unpinMessage('${item.id}')">
          <i class="bi bi-x"></i>
        </button>
      `;
      pinnedItem.onclick = (e) => {
        if (e.target.tagName !== 'BUTTON') {
          MessageManager.scrollToMessage(item.id);
        }
      };
      UI.elements.pinnedList.appendChild(pinnedItem);
    });
  }
};

// Export for use in other modules
window.PinnedManager = PinnedManager;
