const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = {
  projects: {
    getAll: () => fetch(`${API_URL}/projects`).then((r) => r.json()),
    getBySlug: (slug: string) => fetch(`${API_URL}/projects/${slug}`).then((r) => r.json()),
  },
  media: {
    getAll: () => fetch(`${API_URL}/media`).then((r) => r.json()),
    upload: (file: File) => {
      const form = new FormData();
      form.append('file', file);
      return fetch(`${API_URL}/media`, {
        method: 'POST',
        body: form,
      }).then((r) => r.json());
    },
  },
  presentations: {
    getAll: () => fetch(`${API_URL}/presentations`).then((r) => r.json()),
  },
  heroSlides: {
    getAll: () => fetch(`${API_URL}/hero-slides`).then((r) => r.json()),
    upload: (file: File) => {
      const form = new FormData();
      form.append('file', file);
      return fetch(`${API_URL}/hero-slides/upload`, {
        method: 'POST',
        body: form,
      }).then((r) => r.json());
    },
    delete: (id: string) => fetch(`${API_URL}/hero-slides/${id}`, { method: 'DELETE' }),
  },
};
