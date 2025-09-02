# ACCA Agent - AI Study Companion 🎓

A comprehensive, feature-rich chatbot designed specifically for ACCA (Association of Chartered Certified Accountants) students. This AI-powered study companion helps with accounting standards, regulations, exam preparation, and more.

## 🌟 Features

### ✅ Core Chatbot Experience (Must-Have)
- **Responsive UI** - Bootstrap-based responsive design optimized for mobile and desktop
- **Advanced Markdown Rendering** - Full support for headings, lists, tables, code blocks with syntax highlighting
- **Copy-to-Clipboard** - One-click copy functionality on every bot response
- **Persistent Chat History** - Automatic saving using localStorage with session management
- **Dark/Light Mode Toggle** - Modern theme switching with system preference detection
- **Smart Quick Reply Buttons** - Context-aware suggestions including "Summarize", "Simplify", "Example", "Exam Tips"
- **User & Bot Avatars** - Clear visual distinction with professional icons
- **Auto-Scroll Behavior** - Smooth scrolling to keep conversation flow natural
- **Typing Indicators** - Visual feedback showing when the bot is processing
- **Enhanced Error Handling** - ACCA-specific error messages with helpful guidance

### 🎨 UX Enhancements (Nice-to-Have)
- **Clean Typography** - Inter font family for excellent readability
- **Professional Spacing** - Consistent padding, margins, and visual hierarchy
- **Message Timestamps** - Time stamps for better conversation tracking
- **Multi-Format Downloads** - Export chat as PDF, Markdown, or plain text
- **Session Management** - "New Chat" functionality with confirmation
- **Expandable Content** - Collapsible long responses with "Read more" functionality
- **Advanced Keyboard Shortcuts** - Enter/Shift+Enter, Ctrl+K for search, Escape to close
- **Progressive Disclosure** - Smart content truncation for better readability
- **ACCA-Specific FAQ** - Curated suggested prompts for common accounting topics
- **Simple Analytics** - Local usage tracking for insights

### 🚀 Advanced Features (Polish & Engagement)
- **Voice Input** - Web Speech API integration for hands-free interaction
- **Text-to-Speech** - Read responses aloud for accessibility
- **Advanced Search** - Full-text search through chat history with highlighting
- **Pin Messages** - Bookmark important responses for quick reference
- **Share Conversations** - Generate shareable links for collaboration
- **Custom Theming** - Advanced CSS custom properties for branding
- **User Feedback System** - Thumbs up/down rating for continuous improvement
- **ACCA Term Highlighting** - Automatic bold formatting for key accounting terms
- **PWA Support** - Installable web app with offline capabilities
- **Context Memory** - Visual indicators showing conversation continuity
- **Professional Error Messages** - Exam-style feedback for better learning

## 🛠️ Technical Implementation

### Architecture
- **Frontend**: Pure HTML5, CSS3, and ES6+ JavaScript (modular design)
- **Styling**: Bootstrap 5.3.2 + 8 modular CSS files with CSS Custom Properties
- **JavaScript**: 12 modular ES6 modules with clear separation of concerns
- **Icons**: Bootstrap Icons for consistent visual design
- **Fonts**: Inter font family from Google Fonts
- **Markdown**: Marked.js with highlight.js for syntax highlighting
- **PDF Generation**: jsPDF for client-side PDF creation
- **Storage**: localStorage with dedicated storage management module
- **PWA**: Service Worker + Web App Manifest with comprehensive caching

### Modular Design Benefits
- **Maintainability**: Each module has a single responsibility
- **Performance**: Only load what you need, better caching
- **Scalability**: Easy to add new features without touching existing code
- **Debugging**: Isolated functionality makes issues easier to track
- **Collaboration**: Multiple developers can work on different modules
- **Testing**: Each module can be tested independently

### Key Libraries
```html
<!-- Core Frameworks -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.min.css" rel="stylesheet">

<!-- Typography -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Functionality -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

### File Structure
```
acca-agent/
├── index.html              # Main HTML file (9KB - clean and minimal)
├── index-old.html          # Backup of original monolithic file
├── manifest.json           # PWA manifest
├── sw.js                  # Service worker for offline support
├── README.md              # This documentation
└── assets/
    ├── css/               # Modular stylesheets
    │   ├── variables.css  # CSS custom properties and theme variables
    │   ├── base.css       # Base styles and layout
    │   ├── header.css     # Header and search components
    │   ├── messages.css   # Message display and formatting
    │   ├── input.css      # Input field and quick replies
    │   ├── components.css # Modals, ratings, and other components
    │   ├── responsive.css # Media queries and responsive design
    │   └── animations.css # Keyframes and transitions
    ├── js/                # Modular JavaScript
    │   ├── config.js      # Configuration and constants
    │   ├── utils.js       # Utility functions
    │   ├── storage.js     # Local storage management
    │   ├── api.js         # API communication
    │   ├── ui.js          # UI management and DOM manipulation
    │   ├── messages.js    # Message rendering and management
    │   ├── chat.js        # Main chat functionality
    │   ├── search.js      # Search functionality
    │   ├── pinned.js      # Pinned messages management
    │   ├── speech.js      # Speech recognition and text-to-speech
    │   ├── export.js      # Export and sharing functionality
    │   ├── events.js      # Event handlers and keyboard shortcuts
    │   └── app.js         # Main application controller
    └── images/
        └── favicon.ico    # Application icon
```

## 🚀 Getting Started

### Quick Start
1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. Start chatting with the ACCA Agent!

### Local Development
```bash
# For local development with HTTPS (required for some features like voice input)
python -m http.server 8000
# or
npx serve .
```

### PWA Installation
- Visit the app in a supported browser
- Look for the "Install App" button in the header
- Follow browser prompts to install as a native app

## 📱 Browser Support

### Recommended Browsers
- **Chrome/Edge 88+** - Full feature support including voice input
- **Firefox 85+** - Most features supported (voice input limited)
- **Safari 14+** - Core features supported

### Mobile Support
- **iOS Safari 14+** - Optimized mobile experience
- **Chrome Mobile 88+** - Full feature parity
- **Samsung Internet 13+** - Good compatibility

## 🎯 ACCA-Specific Features

### Intelligent Content Recognition
- Auto-highlights key ACCA terms (IFRS, GAAP, IAS, etc.)
- Context-aware quick replies for accounting topics
- Exam-focused error messages and guidance

### Study-Focused UI
- Clean, distraction-free interface
- Professional color scheme suitable for study environments
- Expandable content for detailed accounting standards
- Downloadable conversations for revision notes

### Suggested Prompts
- Revenue Recognition (IFRS 15)
- IFRS vs GAAP Comparisons  
- ACCA Exam Preparation Strategies
- Consolidation Accounting
- And many more...

## 🔧 Configuration

### API Integration
Update the `API_URL` constant in `index.html`:
```javascript
const API_URL = "https://your-api-endpoint.com/webhook/agent";
```

### Custom Theming
The app uses CSS custom properties for easy theming:
```css
:root {
  --primary-color: #0066cc;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  /* ... and many more */
}
```

### PWA Customization
Edit `manifest.json` to customize:
- App name and description
- Icons and theme colors
- Start URL and display mode
- Shortcuts and categories

## 📊 Analytics & Privacy

### Local Analytics
- Simple usage tracking stored locally
- No data sent to external servers
- View stats through browser developer tools: `getUsageStats()`

### Privacy Features
- All data stored locally in browser
- No cookies or external tracking
- Shareable links contain only conversation data
- Full user control over data retention

## 🛡️ Security Considerations

### Data Handling
- All chat history stored in localStorage
- Shareable URLs use base64 encoding (not encryption)
- No sensitive data transmitted to third parties
- Service Worker caches only static resources

### Best Practices
- Regular browser cache clearing for sensitive study materials
- Use private/incognito mode for confidential conversations
- Be mindful when sharing conversation links

## 🤝 Contributing

### Development Guidelines
1. Maintain accessibility standards (WCAG 2.1 AA)
2. Test across different devices and browsers
3. Keep the ACCA study focus in mind
4. Follow the existing code style and structure

### Feature Requests
Focus areas for future development:
- Additional ACCA paper-specific features
- Integration with ACCA official resources
- Advanced study planning tools
- Collaborative study features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support & Troubleshooting

### Common Issues
1. **Voice input not working**: Ensure HTTPS and microphone permissions
2. **PWA install not showing**: Check browser compatibility and HTTPS
3. **Shared links not loading**: Verify URL encoding and length limits
4. **Dark mode not persisting**: Check localStorage permissions

### Getting Help
- Check browser console for error messages
- Verify all external CDN resources are loading
- Test in a different browser to isolate issues
- Clear browser cache and localStorage if needed

---

**Built with ❤️ for ACCA students worldwide**

*Last updated: December 2024*