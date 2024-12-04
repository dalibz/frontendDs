import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
//import './styles/global.css'; // Add your custom global styles if needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
