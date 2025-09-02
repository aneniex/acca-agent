// API Communication
const API = {
  // Send message to API
  async sendMessage(message) {
    try {
      const response = await fetch(`${CONFIG.API_URL}?input=${encodeURIComponent(message)}&sessionId=${CONFIG.SESSION_ID}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Check content type to handle different response formats
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If not JSON, try to get text and check if it's HTML
        const textResponse = await response.text();
        console.warn('Received non-JSON response:', textResponse.substring(0, 100) + '...');
        
        // Try to extract meaningful content from HTML if possible
        if (textResponse.includes('<html') || textResponse.includes('<!DOCTYPE')) {
          throw new Error('Received HTML instead of JSON response');
        }
        
        // If it's plain text, try to parse it as a simple response
        data = [{ output: textResponse.trim() }];
      }
      
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
      } else if (error.message.includes('Invalid response') || error.message.includes('HTML instead of JSON')) {
        errorType = 'parsing';
      } else if (error.message.includes('HTTP 404')) {
        errorType = 'notFound';
      } else if (error.message.includes('HTTP 5')) {
        errorType = 'server';
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
  },

  // Test API with a simple message
  async testConnection() {
    try {
      console.log('Testing API connection to:', CONFIG.API_URL);
      const response = await fetch(`${CONFIG.API_URL}?input=test&sessionId=test-${Date.now()}`);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('JSON Response:', data);
        return { success: true, data };
      } else {
        const textResponse = await response.text();
        console.log('Text Response (first 200 chars):', textResponse.substring(0, 200));
        return { success: false, error: 'Non-JSON response', contentType, preview: textResponse.substring(0, 200) };
      }
    } catch (error) {
      console.error('API Test Error:', error);
      return { success: false, error: error.message };
    }
  }
};

// Export for use in other modules
window.API = API;
