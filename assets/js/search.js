// Search Management
const SearchManager = {
  currentSearchTerm: '',

  // Handle search input
  handleSearch() {
    const term = UI.elements.searchInput.value.toLowerCase().trim();
    this.currentSearchTerm = term;
    
    if (!term) {
      this.clearSearch();
      return;
    }
    
    const messageWrappers = UI.elements.chatMessages.querySelectorAll('.message-wrapper');
    let hasResults = false;
    
    messageWrappers.forEach(wrapper => {
      const messageContent = wrapper.querySelector('.message-content');
      const text = messageContent.textContent.toLowerCase();
      
      if (text.includes(term)) {
        wrapper.style.display = 'flex';
        Utils.highlightSearchTerm(messageContent, term);
        hasResults = true;
      } else {
        wrapper.style.display = 'none';
      }
    });
    
    if (!hasResults) {
      Utils.showNotification('No messages found matching your search', 'info');
    }
  },

  // Clear search results
  clearSearch() {
    const messageWrappers = UI.elements.chatMessages.querySelectorAll('.message-wrapper');
    messageWrappers.forEach(wrapper => {
      wrapper.style.display = 'flex';
      const messageContent = wrapper.querySelector('.message-content');
      Utils.removeHighlights(messageContent);
    });
  }
};

// Export for use in other modules
window.SearchManager = SearchManager;
