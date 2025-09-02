// API Communication
const API = {
  // Send message to API
  async sendMessage(message) {
    try {
      const response = await fetch(`${CONFIG.API_URL}?input=${encodeURIComponent(message)}&sessionId=${CONFIG.SESSION_ID}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid response format');
      }
      
      return data[0]?.output || "⚠️ I apologize, but I didn't receive a proper response. Please try again.";
      
    } catch (error) {
      console.error('API Error:', error);
      
      // Determine error type for better messaging
      let errorType = 'api';
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorType = 'network';
      } else if (error.message.includes('Invalid response')) {
        errorType = 'parsing';
      }
      
      return this.getErrorMessage(errorType);
    }
  },

  // Get appropriate error message
  getErrorMessage(errorType) {
    return CONFIG.ERROR_MESSAGES[errorType] || CONFIG.ERROR_MESSAGES.api;
  },

  // Check if API is available
  async checkHealth() {
    try {
      const response = await fetch(CONFIG.API_URL, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};

// Export for use in other modules
window.API = API;
