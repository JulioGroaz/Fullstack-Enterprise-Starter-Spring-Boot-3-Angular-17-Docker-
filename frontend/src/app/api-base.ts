// English: Global window type for API base override.
// Italiano: Tipo globale window per override della base API.
declare global {
  interface Window {
    __API_BASE_URL__?: string;
  }
}

// English: Base URL for API calls, overridable at runtime.
// Italiano: URL base per chiamate API, sovrascrivibile a runtime.
export const API_BASE_URL = window.__API_BASE_URL__ || 'http://localhost:8080/api';
