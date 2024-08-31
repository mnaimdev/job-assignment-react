import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';


const baseURL = 'http://127.0.0.1:8000/api';

axios.defaults.baseURL = baseURL;

axios.defaults.headers.common['Authorization']='Bearer ' + localStorage.getItem("token");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
