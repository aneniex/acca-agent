// Speech Recognition and Text-to-Speech
const SpeechManager = {
  recognition: null,
  synthesis: null,

  // Initialize speech features
  init() {
    this.setupSpeechRecognition();
    this.setupTextToSpeech();
  },

  // Setup speech recognition
  setupSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        UI.elements.userInput.value = transcript;
        UI.handleInputChange();
      };
      
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        Utils.showNotification('Speech recognition failed. Please try again.', 'error');
      };
    }
  },

  // Setup text-to-speech
  setupTextToSpeech() {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  },

  // Toggle voice input
  toggleVoiceInput() {
    if (!this.recognition) {
      Utils.showNotification('Voice input not supported in this browser', 'error');
      return;
    }
    
    const voiceBtn = document.getElementById('voiceBtn');
    
    if (this.recognition.state === 'listening') {
      this.recognition.stop();
      voiceBtn.innerHTML = '<i class="bi bi-mic"></i>';
    } else {
      this.recognition.start();
      voiceBtn.innerHTML = '<i class="bi bi-mic-fill text-danger"></i>';
      Utils.showNotification('Listening... Speak now', 'info');
    }
  },

  // Speak message text
  speakMessage(text) {
    if (!this.synthesis) return;
    
    // Stop any ongoing speech
    this.synthesis.cancel();
    
    // Clean text for speech
    const cleanText = text.replace(/[#*_`]/g, '').replace(/\n+/g, ' ');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    this.synthesis.speak(utterance);
  }
};

// Export for use in other modules
window.SpeechManager = SpeechManager;
