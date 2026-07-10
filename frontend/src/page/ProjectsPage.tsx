import { type FC, useEffect, useState } from 'react';
import ProjectCard from '../components/Projects/ProjectCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/projects-page.css';

interface ProjectData {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description?: string;
  bgImage?: string;
  imageUrl?: string;
  published: boolean;
}

const ProjectsPage: FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch('/api/projects?all=true')
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.filter((p: ProjectData) => p.published));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="projects-page">
        <Header />
        <main className="projects-main">
          <h1 className="projects-title">Все проекты</h1>
          <p className="projects-subtitle">Загрузка...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="projects-page">
      <Header />
      <main className="projects-main">
        <h1 className="projects-title">Все проекты</h1>
        <p className="projects-subtitle">3D-визуализация, AR и интерактивные решения</p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={{
                id: project.slug,
                title: project.title,
                subtitle: project.subtitle,
                imageUrl: project.imageUrl ?? project.bgImage ?? '/projects/жк1.jpg',
              }}
              index={index}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
