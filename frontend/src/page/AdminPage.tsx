import { useState, useEffect, type FC, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './AdminPage.module.css';

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description?: string;
  bgImage?: string;
  imageUrl?: string;
  benefits?: string[];
  useCases?: string;
  tags?: string[];
  published: boolean;
  order: number;
}

interface MediaItem {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
  type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
}

interface Slide {
  id?: string;
  title?: string;
  text?: string;
  imageUrl?: string;
  order?: number;
}

interface Presentation {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  thumbnailUrl?: string;
  slides: Slide[];
  published: boolean;
}

interface HeroSlide {
  id: string;
  imageUrl: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  order: number;
}

const AdminPage: FC = () => {
  const [activeTab, setActiveTab] = useState<
    'projects' | 'presentations' | 'media' | 'heroSlides' | 'settings'
  >('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPresentation, setEditingPresentation] = useState<Presentation | null>(null);
  const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(null);
  const [ctaVideoUrl, setCtaVideoUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [projectsRes, mediaRes, presRes, heroSlidesRes] = await Promise.all([
        fetch('/api/projects?all=true'),
        fetch('/api/media'),
        fetch('/api/presentations'),
        fetch('/api/hero-slides'),
      ]);
      const projectsData = await projectsRes.json();
      const mediaData = await mediaRes.json();
      const presData = await presRes.json();
      const heroSlidesData = await heroSlidesRes.json();
      setProjects(projectsData);
      setMedia(mediaData);
      setPresentations(presData);
      setHeroSlides(heroSlidesData);
      const ctaVideoRes = await fetch('/api/settings/ctaVideo').catch(() => null);
      if (ctaVideoRes) {
        const ctaVideo = await ctaVideoRes.json().catch(() => null);
        if (ctaVideo) setCtaVideoUrl(ctaVideo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleMediaUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      for (const file of files) {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/media', { method: 'POST', body: form });
        if (!res.ok) {
          const error = await res.json();
          alert(`Ошибка загрузки: ${error.error || 'Неизвестно'}`);
          continue;
        }
        const newMedia = await res.json();
        setMedia((m) => [newMedia, ...m]);
      }
    } catch {
      alert('Ошибка при загрузке файлов');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    await handleMediaUpload(e.dataTransfer.files);
  };

  const handleProjectUpdate = async (project: Project) => {
    const isNew = project.id === 'new';
    const { id, ...rest } = project;
    const url = isNew ? '/api/projects' : `/api/projects/${id}`;

    const response = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rest),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Ошибка: ${error.error || 'Не удалось сохранить проект'}`);
      return;
    }

    const saved = await response.json();
    if (isNew) {
      setProjects((p) => [...p, saved]);
    } else {
      setProjects((p) => p.map((pr) => (pr.id === id ? saved : pr)));
    }
    setEditingProject(null);
  };

  const handleProjectDelete = async (id: string) => {
    if (!confirm('Удалить проект?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects((p) => p.filter((pr) => pr.id !== id));
  };

  const handleMediaDelete = async (id: string) => {
    if (!confirm('Удалить медиафайл?')) return;
    await fetch(`/api/media/${id}`, { method: 'DELETE' });
    setMedia((m) => m.filter((item) => item.id !== id));
  };

  const handlePresentationUpdate = async (presentation: Presentation) => {
    const isNew = presentation.id === 'new';
    const { id, slides, ...rest } = presentation;

    const response = await fetch(isNew ? '/api/presentations' : `/api/presentations/${id}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...rest,
        slide: slides?.map((s, i) => ({ ...s, order: s.order ?? i })),
      }),
    });
    const saved = await response.json();

    if (isNew) {
      setPresentations((p) => [...p, saved]);
    } else {
      setPresentations((p) => p.map((pr) => (pr.id === id ? saved : pr)));
    }
    setEditingPresentation(null);
  };

  const handlePresentationDelete = async (id: string) => {
    if (!confirm('Удалить презентацию?')) return;
    await fetch(`/api/presentations/${id}`, { method: 'DELETE' });
    setPresentations((p) => p.filter((pr) => pr.id !== id));
  };

  const handleHeroSlideUpdate = async (slide: HeroSlide) => {
    const isNew = slide.id === 'new';
    const { id, ...rest } = slide;
    const url = isNew ? '/api/hero-slides' : `/api/hero-slides/${id}`;

    const response = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rest),
    });

    if (!response.ok) return;

    const saved = await response.json();
    if (isNew) {
      setHeroSlides((s) => [...s, saved]);
    } else {
      setHeroSlides((s) => s.map((sl) => (sl.id === id ? saved : sl)));
    }
    setEditingHeroSlide(null);
  };

  const handleHeroSlideDelete = async (id: string) => {
    if (!confirm('Удалить слайд?')) return;
    await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' });
    setHeroSlides((s) => s.filter((sl) => sl.id !== id));
  };

  const ProjectForm = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const [formData, setFormData] = useState(project);

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>{project.id === 'new' ? 'Новый проект' : 'Редактирование проекта'}</h2>
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Заголовок"
          />
          <input
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Подзаголовок"
          />
          <input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="Slug (URL)"
          />
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Описание"
          />
          <input
            value={formData.useCases || ''}
            onChange={(e) => setFormData({ ...formData, useCases: e.target.value })}
            placeholder="Где применяется"
          />
          <input
            value={formData.benefits?.join(', ') || ''}
            onChange={(e) =>
              setFormData({ ...formData, benefits: e.target.value.split(',').map((s) => s.trim()) })
            }
            placeholder="Преимущества (через запятую)"
          />
          <input
            value={formData.tags?.join(', ') || ''}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value.split(',').map((s) => s.trim()) })
            }
            placeholder="Теги (через запятую)"
          />
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            <span>Опубликован</span>
          </label>
          <div className={styles.modalActions}>
            <button className="btn btn-primary" onClick={() => void handleProjectUpdate(formData)}>
              Сохранить
            </button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    );
  };

  const PresentationForm = ({ pres, onClose }: { pres: Presentation; onClose: () => void }) => {
    const [formData, setFormData] = useState(pres);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/presentations/upload', { method: 'POST', body: form });
      if (res.ok) {
        const newPres = await res.json();
        setPresentations((p) => [...p, newPres]);
      } else {
        const error = await res.json();
        alert(`Ошибка: ${error.error || 'Не удалось загрузить файл'}`);
      }
    };

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>{pres.id === 'new' ? 'Новая презентация' : 'Редактирование презентации'}</h2>
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Название"
          />
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Описание"
          />
          <div className={styles.slidesSection}>
            <p style={{ marginBottom: 8, fontWeight: 600 }}>Слайды</p>
            {(formData.slides || []).map((slide, idx) => (
              <div key={idx} className={styles.slideItem}>
                <input
                  value={slide.title || ''}
                  onChange={(e) => {
                    const slides = [...(formData.slides || [])];
                    slides[idx] = { ...slides[idx], title: e.target.value };
                    setFormData({ ...formData, slides });
                  }}
                  placeholder="Заголовок слайда"
                />
                <input
                  value={slide.text || ''}
                  onChange={(e) => {
                    const slides = [...(formData.slides || [])];
                    slides[idx] = { ...slides[idx], text: e.target.value };
                    setFormData({ ...formData, slides });
                  }}
                  placeholder="Текст слайда"
                />
                <select
                  value={slide.imageUrl || ''}
                  onChange={(e) => {
                    const slides = [...(formData.slides || [])];
                    slides[idx] = { ...slides[idx], imageUrl: e.target.value };
                    setFormData({ ...formData, slides });
                  }}
                >
                  <option value="">Выберите изображение</option>
                  {media.map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.originalName}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button
              onClick={() => setFormData({ ...formData, slides: [...(formData.slides || []), {}] })}
              className="btn btn-outline-white"
            >
              + Добавить слайд
            </button>
          </div>
          <div className={styles.fileUploadSection}>
            <input
              type="file"
              accept=".pptx,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint"
              style={{ display: 'none' }}
              id="presentation-file-upload"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="presentation-file-upload"
              className="btn btn-outline-white"
              style={{ marginBottom: 16 }}
            >
              📁 Загрузить PPTX файл
            </label>
          </div>
          <div className={styles.modalActions}>
            <button
              className="btn btn-primary"
              onClick={() => void handlePresentationUpdate(formData)}
            >
              Сохранить
            </button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    );
  };

  const HeroSlideForm = ({ slide, onClose }: { slide: HeroSlide; onClose: () => void }) => {
    const [formData, setFormData] = useState(slide);
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/hero-slides/upload', { method: 'POST', body: form });
      if (res.ok) {
        const m = await res.json();
        setFormData({ ...formData, imageUrl: m.imageUrl });
      }
      setUploading(false);
    };

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>{slide.id === 'new' ? 'Новый слайд' : 'Редактирование слайда'}</h2>
          <input
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Заголовок"
          />
          <input
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Подзаголовок (текст анимации)"
          />
          <input
            value={formData.imageAlt || ''}
            onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
            placeholder="Alt текст"
          />
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            placeholder="Порядок"
          />
          <div className={styles.bgSection}>
            <p>Фоновое изображение: {formData.imageUrl || 'не загружено'}</p>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="hero-slide-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="hero-slide-upload" className="btn btn-outline-white">
              {uploading ? 'Загрузка...' : 'Загрузить изображение'}
            </label>
          </div>
          <div className={styles.modalActions}>
            <button
              className="btn btn-primary"
              onClick={() => void handleHeroSlideUpdate(formData)}
            >
              Сохранить
            </button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <div className={styles.admin}>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Админ панель</h1>
        <Link to="/" className={styles.siteLink}>
          На сайт →
        </Link>
      </div>

      <div className={styles.tabs}>
        <button
          className={activeTab === 'projects' ? styles.tabActive : ''}
          onClick={() => setActiveTab('projects')}
        >
          Проекты
        </button>
        <button
          className={activeTab === 'heroSlides' ? styles.tabActive : ''}
          onClick={() => setActiveTab('heroSlides')}
        >
          Слайды
        </button>
        <button
          className={activeTab === 'presentations' ? styles.tabActive : ''}
          onClick={() => setActiveTab('presentations')}
        >
          Презентации
        </button>
        <button
          className={activeTab === 'media' ? styles.tabActive : ''}
          onClick={() => setActiveTab('media')}
        >
          Медиафайлы
        </button>
        <button
          className={activeTab === 'settings' ? styles.tabActive : ''}
          onClick={() => setActiveTab('settings')}
        >
          Настройки
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'projects' && (
          <div>
            <div className={styles.sectionHeader}>
              <h2>Проекты</h2>
              <button
                className="btn btn-primary"
                onClick={() =>
                  setEditingProject({
                    id: 'new',
                    title: '',
                    slug: '',
                    published: false,
                    order: 0,
                    benefits: [],
                    tags: [],
                  })
                }
              >
                + Добавить
              </button>
            </div>
            <div className={styles.itemsGrid}>
              {projects.map((p) => (
                <div key={p.id} className={styles.itemCard}>
                  <div>
                    <span className={styles.itemTitle}>{p.title}</span>
                    <span className={styles.itemSlug}>/{p.slug}</span>
                    <span className={styles.itemStatus}>
                      {p.published ? 'Опубликован' : 'Черновик'}
                    </span>
                  </div>
                  <div className={styles.itemActions}>
                    <button onClick={() => setEditingProject(p)}>✏️</button>
                    <button onClick={() => void handleProjectDelete(p.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'heroSlides' && (
          <div>
            <div className={styles.sectionHeader}>
              <h2>Слайды Hero</h2>
              <button
                className="btn btn-primary"
                onClick={() => setEditingHeroSlide({ id: 'new', imageUrl: '', order: 0 })}
              >
                + Добавить
              </button>
            </div>
            <div className={styles.itemsGrid}>
              {heroSlides.map((s) => (
                <div key={s.id} className={styles.itemCard}>
                  <div>
                    <span className={styles.itemTitle}>{s.title || 'Без заголовка'}</span>
                    <span className={styles.itemSlug}>Порядок: {s.order}</span>
                  </div>
                  <div className={styles.itemActions}>
                    <button onClick={() => setEditingHeroSlide(s)}>✏️</button>
                    <button onClick={() => void handleHeroSlideDelete(s.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'presentations' && (
          <div>
            <div className={styles.sectionHeader}>
              <h2>Презентации</h2>
              <button
                className="btn btn-primary"
                onClick={() =>
                  setEditingPresentation({
                    id: 'new',
                    title: '',
                    fileUrl: '',
                    slides: [],
                    published: false,
                  })
                }
              >
                + Добавить
              </button>
            </div>
            <div className={styles.itemsGrid}>
              {presentations.map((p) => (
                <div key={p.id} className={styles.itemCard}>
                  <div>
                    <span className={styles.itemTitle}>{p.title}</span>
                    <span className={styles.itemSlug}>{p.slides?.length || 0} слайдов</span>
                  </div>
                  <div className={styles.itemActions}>
                    <button onClick={() => setEditingPresentation(p)}>✏️</button>
                    <button onClick={() => void handlePresentationDelete(p.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            <h2>Медиафайлы</h2>
            <div
              className={`${styles.dropZone} ${dragActive ? styles.dropZoneActive : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <p>Перетащите файлы сюда (изображения, видео, PDF)</p>
              <input
                type="file"
                multiple
                style={{ display: 'none' }}
                id="media-upload"
                onChange={(e) => void handleMediaUpload(e.target.files)}
              />
              <label htmlFor="media-upload" className="btn btn-outline-white">
                Выбрать файлы
              </label>
            </div>
            <div className={styles.itemsGrid}>
              {media.map((m) => (
                <div key={m.id} className={styles.itemCard}>
                  <div>
                    <span className={styles.itemTitle} title={m.originalName}>
                      {m.originalName}
                    </span>
                    <span className={styles.itemSlug}>{Math.round(m.size / 1024)} KB</span>
                  </div>
                  <button onClick={() => void handleMediaDelete(m.id)}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2>Настройки сайта</h2>
            <div className={styles.formRow}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                Видео для CTA секции
              </label>
              <select
                value={ctaVideoUrl}
                onChange={(e) => setCtaVideoUrl(e.target.value)}
                className={styles.modalInput}
              >
                <option value="">- Выберите видео -</option>
                {media
                  .filter((m) => m.type === 'VIDEO')
                  .map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.originalName}
                    </option>
                  ))}
              </select>
              <button
                className="btn btn-primary"
                style={{ marginTop: 12 }}
                onClick={async () => {
                  await fetch('/api/settings/ctaVideo', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ value: ctaVideoUrl }),
                  });
                  alert('Сохранено!');
                }}
              >
                Сохранить
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {editingProject && (
          <ProjectForm project={editingProject} onClose={() => setEditingProject(null)} />
        )}
        {editingHeroSlide && (
          <HeroSlideForm slide={editingHeroSlide} onClose={() => setEditingHeroSlide(null)} />
        )}
        {editingPresentation && (
          <PresentationForm
            pres={editingPresentation}
            onClose={() => setEditingPresentation(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
