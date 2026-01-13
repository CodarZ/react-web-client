import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import App from './App.tsx';
import './styles/index.css';

dayjs.locale('zh-cn');

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
