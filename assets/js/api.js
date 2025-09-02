// API Communication
const API = {
  // Send message to API
  async sendMessage(message) {
    try {
      const response = await fetch(`${CONFIG.API_URL}?input=${encodeURIComponent(message)}&sessionId=${CONFIG.SESSION_ID}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Read as text first to support plain text webhooks
      const rawText = await response.text();
      let reply;
      
      // Try to parse JSON if applicable
      try {
        const parsed = JSON.parse(rawText);
        if (Array.isArray(parsed)) {
          reply = parsed[0]?.output || "⚠️ No response from server.";
        } else if (parsed && typeof parsed === 'object') {
          reply = parsed.output || JSON.stringify(parsed);
        }
      } catch (_) {
        // Not JSON; treat as plain text
        reply = rawText.trim();
      }
      
      if (!reply) {
        reply = "⚠️ No response from server.";
      }

      // Normalize escaped sequences so Markdown renders properly
      if (typeof reply === 'string') {
        reply = reply
          .replace(/\r\n/g, '\n')
          .replace(/\\n/g, '\n')
          .replace(/\\t/g, '    ');
      }
      
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
      
      const rawText = await response.text();
      try {
        const data = JSON.parse(rawText);
        console.log('API JSON Response:', data);
        return { success: true, data };
      } catch (_) {
        console.log('API Plain Text Response:', rawText);
        return { success: true, data: rawText };
      }
      
    } catch (error) {
      console.error('API Test Error:', error);
      return { success: false, error: error.message };
    }
  }
};

// Export for use in other modules
window.API = API;
