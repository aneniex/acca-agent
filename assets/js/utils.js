// Utility Functions
const Utils = {
  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Format timestamp for display
  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  },

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  },

  // Scroll to bottom of chat
  scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  },

  // Copy text to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showNotification('Copied to clipboard!', 'success');
      return true;
    } catch (error) {
      this.showNotification('Failed to copy text', 'error');
      return false;
    }
  },

  // Download file
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Highlight ACCA terms in content
  highlightACCATerms(element) {
    let html = element.innerHTML;
    CONFIG.ACCA_TERMS.forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      html = html.replace(regex, '<strong>$1</strong>');
    });
    element.innerHTML = html;
  },

  // Remove highlights from search
  removeHighlights(element) {
    const marks = element.querySelectorAll('mark');
    marks.forEach(mark => {
      mark.outerHTML = mark.innerHTML;
    });
  },

  // Highlight search terms
  highlightSearchTerm(element, term) {
    this.removeHighlights(element);
    
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
      const text = textNode.textContent;
      const regex = new RegExp(`(${term})`, 'gi');
      
      if (regex.test(text)) {
        const highlightedText = text.replace(regex, '<mark>$1</mark>');
        const wrapper = document.createElement('span');
        wrapper.innerHTML = highlightedText;
        textNode.parentNode.replaceChild(wrapper, textNode);
      }
    });
  }
};

// Export for use in other modules
window.Utils = Utils;
