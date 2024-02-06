import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';
import { QueryClient, QueryClientProvider} from 'react-query';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const queryClient = new QueryClient()

axios.defaults.baseURL = process.env.REACT_APP_API_HTTP_ADDRESS;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
