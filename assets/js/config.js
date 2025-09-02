// Configuration and Constants
const CONFIG = {
  API_URL: "https://aneniex.app.n8n.cloud/webhook-test/agent",
  SESSION_ID: crypto.randomUUID(),
  ACCA_TERMS: [
    'IFRS', 'GAAP', 'IAS', 'ACCA', 'Financial Reporting', 'Audit', 'Taxation',
    'Management Accounting', 'Corporate Law', 'Business Analysis', 'Strategic Business',
    'Revenue Recognition', 'Consolidation', 'Fair Value', 'Impairment',
    'Cash Flow', 'Balance Sheet', 'Income Statement', 'Equity', 'Liability'
  ],
  MAX_CONTEXT_MESSAGES: 5,
  EXPANDABLE_CONTENT_THRESHOLD: 500,
  ERROR_MESSAGES: {
    'network': "I'm having trouble connecting to my knowledge base. This might affect my ability to provide the most current ACCA standards and regulations.",
    'api': "My AI processing is temporarily unavailable. For urgent ACCA queries, please refer to the official ACCA website or your study materials.",
    'parsing': "I had trouble understanding your question. Could you rephrase it? For ACCA topics, try being specific about which paper or standard you're asking about.",
    'validation': "There seems to be an issue with your input. Make sure you're asking about ACCA topics like Financial Reporting, Audit, or Strategic Business.",
    'notFound': "The requested ACCA resource or endpoint was not found. Please check your query or try a different topic.",
    'server': "The ACCA knowledge server is experiencing issues. Please try again in a few moments or contact support if the problem persists."
  }
};

// Export for use in other modules
window.CONFIG = CONFIG;
