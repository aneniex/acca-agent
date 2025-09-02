// Message Management
const MessageManager = {
  // Render message in chat
  renderMessage(message, animate = true) {
    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${message.isUser ? 'user' : ''}`;
    wrapper.dataset.messageId = message.id;
    if (animate) wrapper.style.opacity = '0';

    const avatar = document.createElement('div');
    avatar.className = `avatar ${message.isUser ? 'user-avatar' : 'bot-avatar'}`;
    avatar.innerHTML = message.isUser ? '<i class="bi bi-person"></i>' : '<i class="bi bi-robot"></i>';

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.isUser ? 'user-message' : 'bot-message'}`;
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    if (message.isUser) {
      content.textContent = message.text;
    } else {
      // Fast typing effect: progressively render markdown
      this.typeRenderMarkdown(message.text, content, () => {
        Utils.highlightACCATerms(content);
        if (message.text.length > CONFIG.EXPANDABLE_CONTENT_THRESHOLD) {
          UI.makeExpandable(content, messageDiv);
        }
        // Syntax highlighting for code blocks after final render
        wrapper.querySelectorAll('pre code').forEach(block => {
          try { hljs.highlightElement(block); } catch (_) {}
        });
      });
    }

    const meta = document.createElement('div');
    meta.className = 'message-meta';
    
    const timestamp = document.createElement('span');
    timestamp.className = 'message-timestamp';
    timestamp.textContent = Utils.formatTimestamp(message.timestamp);
    
    const actions = document.createElement('div');
    actions.className = 'message-actions';
    
    if (!message.isUser) {
      // Copy button
      const copyBtn = UI.createActionButton('bi-clipboard', 'Copy', () => this.copyMessage(message.text));
      actions.appendChild(copyBtn);
      
      // Pin button
      const pinBtn = UI.createActionButton('bi-pin', 'Pin', () => PinnedManager.pinMessage(message));
      actions.appendChild(pinBtn);
      
      // Text-to-speech button
      if (SpeechManager.synthesis) {
        const speakBtn = UI.createActionButton('bi-volume-up', 'Read aloud', () => SpeechManager.speakMessage(message.text));
        actions.appendChild(speakBtn);
      }
      
      // Rating buttons
      const ratingContainer = document.createElement('div');
      ratingContainer.className = 'rating-container';
      
      const thumbsUp = UI.createRatingButton('bi-hand-thumbs-up', 'positive', message.id);
      const thumbsDown = UI.createRatingButton('bi-hand-thumbs-down', 'negative', message.id);
      
      ratingContainer.appendChild(thumbsUp);
      ratingContainer.appendChild(thumbsDown);
      actions.appendChild(ratingContainer);
    }

    meta.appendChild(timestamp);
    meta.appendChild(actions);
    
    messageDiv.appendChild(content);
    messageDiv.appendChild(meta);
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(messageDiv);
    
    UI.elements.chatMessages.appendChild(wrapper);
    
    if (animate) {
      requestAnimationFrame(() => {
        wrapper.style.opacity = '1';
      });
    }
    
    Utils.scrollToBottom();
  },

  // Progressive markdown rendering for bot messages
  typeRenderMarkdown(fullText, targetEl, onDone) {
    const CHUNK_SIZE = 12;     // characters per tick (fast)
    const DELAY_MS = 8;        // time between ticks

    let index = 0;
    const len = fullText.length;

    const tick = () => {
      if (index >= len) {
        if (typeof onDone === 'function') onDone();
        return;
      }
      index = Math.min(index + CHUNK_SIZE, len);
      const partial = fullText.slice(0, index);
      // Render partial markdown each tick
      targetEl.innerHTML = marked.parse(partial);
      Utils.scrollToBottom();
      setTimeout(tick, DELAY_MS);
    };

    // Start the typing effect
    tick();
  },

  // Copy message text
  async copyMessage(text) {
    await Utils.copyToClipboard(text);
  },

  // Rate message
  rateMessage(messageId, rating) {
    Storage.saveMessageRating(messageId, rating);
    
    const wrapper = document.querySelector(`[data-message-id="${messageId}"]`);
    if (wrapper) {
      const ratingBtns = wrapper.querySelectorAll('.rating-btn');
      ratingBtns.forEach(btn => btn.classList.remove('active'));
      
      const activeBtn = wrapper.querySelector(`.rating-btn.${rating}`);
      if (activeBtn) activeBtn.classList.add('active');
    }
    
    Utils.showNotification('Thank you for your feedback!', 'success');
  },

  // Scroll to specific message
  scrollToMessage(messageId) {
    const element = document.querySelector(`[data-message-id="${messageId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.style.background = 'rgba(0, 102, 204, 0.1)';
      setTimeout(() => {
        element.style.background = '';
      }, 2000);
    }
  }
};

// Export for use in other modules
window.MessageManager = MessageManager;
