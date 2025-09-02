// Export and Share Functions
const ExportManager = {
  // Show download modal
  showDownloadModal() {
    UI.showModal('downloadModal');
  },

  // Download chat in specified format
  downloadChat(format) {
    UI.closeModal('downloadModal');
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `acca-chat-${timestamp}`;
    
    switch (format) {
      case 'pdf':
        this.downloadAsPDF(filename);
        break;
      case 'markdown':
        this.downloadAsMarkdown(filename);
        break;
      case 'txt':
        this.downloadAsText(filename);
        break;
    }
  },

  // Download as PDF
  downloadAsPDF(filename) {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      let yPosition = 20;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const maxWidth = doc.internal.pageSize.width - 2 * margin;
      
      doc.setFontSize(16);
      doc.text('ACCA Agent Chat History', margin, yPosition);
      yPosition += 20;
      
      ChatManager.chatHistory.forEach(msg => {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(12);
        doc.setFont(undefined, msg.isUser ? 'bold' : 'normal');
        
        const sender = msg.isUser ? 'You' : 'ACCA Agent';
        const timestamp = Utils.formatTimestamp(msg.timestamp);
        
        doc.text(`${sender} (${timestamp}):`, margin, yPosition);
        yPosition += 10;
        
        doc.setFont(undefined, 'normal');
        const lines = doc.splitTextToSize(msg.text, maxWidth);
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * 5 + 10;
      });
      
      doc.save(`${filename}.pdf`);
      Utils.showNotification('Chat downloaded as PDF', 'success');
    } catch (error) {
      Utils.showNotification('Failed to generate PDF', 'error');
    }
  },

  // Download as Markdown
  downloadAsMarkdown(filename) {
    let markdown = '# ACCA Agent Chat History\n\n';
    
    ChatManager.chatHistory.forEach(msg => {
      const sender = msg.isUser ? '**You**' : '**ACCA Agent**';
      const timestamp = Utils.formatTimestamp(msg.timestamp);
      
      markdown += `## ${sender} _(${timestamp})_\n\n`;
      markdown += `${msg.text}\n\n---\n\n`;
    });
    
    Utils.downloadFile(markdown, `${filename}.md`, 'text/markdown');
    Utils.showNotification('Chat downloaded as Markdown', 'success');
  },

  // Download as Text
  downloadAsText(filename) {
    let text = 'ACCA Agent Chat History\n';
    text += '='.repeat(25) + '\n\n';
    
    ChatManager.chatHistory.forEach(msg => {
      const sender = msg.isUser ? 'You' : 'ACCA Agent';
      const timestamp = Utils.formatTimestamp(msg.timestamp);
      
      text += `${sender} (${timestamp}):\n`;
      text += `${msg.text}\n\n`;
      text += '-'.repeat(50) + '\n\n';
    });
    
    Utils.downloadFile(text, `${filename}.txt`, 'text/plain');
    Utils.showNotification('Chat downloaded as text file', 'success');
  },

  // Generate share URL
  generateShareUrl() {
    const shareData = {
      chatHistory: ChatManager.chatHistory,
      timestamp: new Date().toISOString(),
      title: 'ACCA Agent Conversation'
    };
    
    const compressed = btoa(JSON.stringify(shareData));
    return `${window.location.origin}${window.location.pathname}?shared=${compressed}`;
  },

  // Show share modal
  showShareModal() {
    const shareUrl = this.generateShareUrl();
    document.getElementById('shareUrl').value = shareUrl;
    UI.showModal('shareModal');
  },

  // Copy share URL
  async copyShareUrl() {
    const shareUrl = document.getElementById('shareUrl');
    shareUrl.select();
    await Utils.copyToClipboard(shareUrl.value);
  },

  // Load shared conversation
  loadSharedConversation() {
    const urlParams = new URLSearchParams(window.location.search);
    const shared = urlParams.get('shared');
    
    if (shared) {
      try {
        const shareData = JSON.parse(atob(shared));
        if (shareData.chatHistory && Array.isArray(shareData.chatHistory)) {
          ChatManager.chatHistory = shareData.chatHistory;
          ChatManager.chatHistory.forEach(msg => MessageManager.renderMessage(msg, false));
          UI.hideIntroMessage();
          Utils.showNotification('Shared conversation loaded!', 'success');
        }
      } catch (error) {
        console.error('Failed to load shared conversation:', error);
        Utils.showNotification('Failed to load shared conversation', 'error');
      }
    }
  }
};

// Export for use in other modules
window.ExportManager = ExportManager;
