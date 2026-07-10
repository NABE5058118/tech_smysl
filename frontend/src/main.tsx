import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n/i18n';
import HomePage from './page/Home';
import ProjectPage from './page/Project';
import ProjectsPage from './page/ProjectsPage';
import AdminPage from './page/AdminPage';
import './style/style.css';

createRoot(document.getElementById('app')!).render(
  <BrowserRouter>
    <I18nProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </I18nProvider>
  </BrowserRouter>,
);
