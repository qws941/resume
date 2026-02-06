export const DASHBOARD_STYLES = `
* { box-sizing: border-box; margin: 0; padding: 0; }

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus visible styles for accessibility */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

:root {
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-bg-tertiary: #334155;
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-accent: #60a5fa;
  --color-accent-hover: #3b82f6;
  --color-success: #10b981;
  --color-success-bg: #065f46;
  --color-success-text: #6ee7b7;
  --color-warning-bg: #7c2d12;
  --color-warning-text: #fdba74;
  --color-error: #ef4444;
  --color-error-bg: #7f1d1d;
  --color-error-text: #fca5a5;
  --color-border: #334155;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
}

/* Light theme */
[data-theme="light"] {
  --color-bg-primary: #f8fafc;
  --color-bg-secondary: #ffffff;
  --color-bg-tertiary: #f1f5f9;
  --color-text-primary: #1e293b;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;
  --color-border: #e2e8f0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  padding: 1rem 2rem;
  line-height: 1.5;
}

h1 {
  color: var(--color-accent);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

h2 {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-sm);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.stat {
  text-align: center;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  border: 1px solid transparent;
}

.stat:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border);
  transform: translateY(-2px);
}

.stat:active {
  transform: translateY(0);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge-ok { background: var(--color-success-bg); color: var(--color-success-text); }
.badge-applied { background: #1e40af; color: #93c5fd; }
.badge-interview { background: var(--color-warning-bg); color: var(--color-warning-text); }
.badge-offer { background: var(--color-success-bg); color: var(--color-success-text); }
.badge-rejected { background: var(--color-error-bg); color: var(--color-error-text); }
.badge-saved { background: #374151; color: #9ca3af; }

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

th {
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

tr {
  transition: background var(--transition-fast);
}

tr:hover {
  background: var(--color-bg-tertiary);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-normal);
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--color-accent-hover);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #475569;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #64748b;
}

.btn-danger {
  background: #dc2626;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #b91c1c;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}

.btn-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.375rem;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.btn-icon:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.toolbar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-box {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.5rem 1rem;
  color: var(--color-text-primary);
  min-width: 200px;
  transition: border-color var(--transition-fast);
}

.search-box:focus {
  outline: none;
  border-color: var(--color-accent-hover);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

select {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.5rem 0.75rem;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

select:focus {
  outline: none;
  border-color: var(--color-accent-hover);
}

.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal.active {
  display: flex;
}

.modal-content {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-md);
  animation: modalSlideIn 0.2s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  color: var(--color-accent);
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: color var(--transition-fast);
}

.close-btn:hover {
  color: var(--color-text-primary);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.75rem;
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-accent-hover);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--color-success-bg);
  color: var(--color-success-text);
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  z-index: 2000;
  display: none;
  animation: toastSlideIn 0.3s ease;
  box-shadow: var(--shadow-md);
}

.toast.error {
  background: var(--color-error-bg);
  color: var(--color-error-text);
}

.toast.active {
  display: block;
}

@keyframes toastSlideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
}

.loading {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.loading::after {
  content: '';
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.automation-status {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-accent-hover);
  display: none;
}

.automation-status.visible {
  display: block;
}

.automation-status.success {
  border-left-color: var(--color-success);
}

.automation-status.error {
  border-left-color: var(--color-error);
}

.keyboard-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-left: auto;
}

kbd {
  display: inline-block;
  padding: 0.125rem 0.375rem;
  font-family: monospace;
  font-size: 0.75rem;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

@media (max-width: 768px) {
  body {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    flex-direction: column;
    align-items: flex-start;
  }

  .toolbar {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: 100%;
  }

  table {
    font-size: 0.875rem;
  }

  th, td {
    padding: 0.5rem;
  }

  .hide-mobile {
    display: none;
  }

  .card {
    padding: 1rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .modal-content {
    padding: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  gap: 1rem;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--color-bg-tertiary);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.skeleton {
  background: linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-secondary) 50%, var(--color-bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-stat { height: 4rem; }
.skeleton-row { height: 3rem; margin-bottom: 0.5rem; }

.error-banner {
  background: var(--color-error-bg);
  border: 1px solid var(--color-error);
  color: var(--color-error-text);
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.error-banner button {
  margin-left: auto;
  background: var(--color-error);
  color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.kbd-help {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  box-shadow: var(--shadow-md);
  z-index: 100;
  max-width: 200px;
}

.kbd-help h4 {
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.kbd-help ul {
  list-style: none;
}

.kbd-help li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.25rem 0;
}

.kbd-help kbd {
  background: var(--color-bg-tertiary);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
  font-family: monospace;
  font-size: 0.7rem;
}

.kbd-help-toggle {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  z-index: 99;
}

.theme-toggle {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 0.5rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1.25rem;
  transition: all var(--transition-fast);
}

.theme-toggle:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

@media (max-width: 600px) {
  .kbd-help { display: none; }
  .kbd-help-toggle { display: none; }
}
`;
