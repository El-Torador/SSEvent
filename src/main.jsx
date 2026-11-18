import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/components.css';
import './styles/site.css';

/** Monte une page dans #root. `theme` (light | dark) s'applique à tout le document. */
export function mount(element, { theme = 'light' } = {}) {
  document.documentElement.dataset.theme = theme;
  createRoot(document.getElementById('root')).render(<StrictMode>{element}</StrictMode>);
}
