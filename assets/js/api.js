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
      const reply = data[0]?.output || "⚠️ No response from server.";
      
      return reply;
      
    } catch (error) {
      console.error('API Error:', error);
      return "❌ Error contacting server.";
    }
  },



  // Check if API is available
  async checkHealth() {
    try {
      const response = await fetch(CONFIG.API_URL, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Test API with a simple message
  async testConnection() {
    try {
      console.log('Testing API connection to:', CONFIG.API_URL);
      const response = await fetch(`${CONFIG.API_URL}?input=test&sessionId=test-${Date.now()}`);
      
      if (!response.ok) {
        return { success: false, error: `HTTP ${response.status}` };
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      return { success: true, data };
      
    } catch (error) {
      console.error('API Test Error:', error);
      return { success: false, error: error.message };
    }
  }
};

// Export for use in other modules
window.API = API;
