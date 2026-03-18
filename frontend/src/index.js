import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import App from './App';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Initialize i18n
i18n.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      translation: {
        welcome: 'Welcome',
        login: 'Login',
        logout: 'Logout',
        dashboard: 'Dashboard',
        production: 'Production',
        materials: 'Materials',
        salary: 'Salary',
        leaves: 'Leaves',
        reports: 'Reports'
      }
    },
    ta: {
      translation: {
        welcome: 'வரவேற்பு',
        login: 'உள்நுழைவு',
        logout: 'வெளியேறு',
        dashboard: 'டாஷ்போர்டு',
        production: 'உற்பத்தி',
        materials: 'பொருட்கள்',
        salary: 'சம்பளம்',
        leaves: 'விடுமுறை',
        reports: 'அறிக்கைகள்'
      }
    },
    hi: {
      translation: {
        welcome: 'स्वागत हे',
        login: 'लॉगिन',
        logout: 'लॉग आउट',
        dashboard: 'डैशबोर्ड',
        production: 'उत्पादन',
        materials: 'सामग्री',
        salary: 'वेतन',
        leaves: 'छुट्टियां',
        reports: 'रिपोर्ट'
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
