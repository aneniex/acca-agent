// Configuration and Constants
const CONFIG = {
  API_URL: "https://aneniex.app.n8n.cloud/webhook/agent",
  SESSION_ID: crypto.randomUUID(),
  ACCA_TERMS: [
    'IFRS', 'GAAP', 'IAS', 'ACCA', 'Financial Reporting', 'Audit', 'Taxation',
    'Management Accounting', 'Corporate Law', 'Business Analysis', 'Strategic Business',
    'Revenue Recognition', 'Consolidation', 'Fair Value', 'Impairment',
    'Cash Flow', 'Balance Sheet', 'Income Statement', 'Equity', 'Liability'
  ],
  MAX_CONTEXT_MESSAGES: 5,
  EXPANDABLE_CONTENT_THRESHOLD: 500
};

// Export for use in other modules
window.CONFIG = CONFIG;
