import { type FC, useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

interface ProjectData {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  imageUrl?: string;
  published: boolean;
}

const Projects: FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    void fetch('/api/projects')
      .then((r) => r.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  return (
    <section className={styles.Projects}>
      <div className={styles.ProjectsInner}>
        <div className={styles.ProjectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={{
                id: project.slug,
                title: project.title,
                subtitle: project.subtitle,
                imageUrl: project.imageUrl ?? '/projects/жк1.jpg',
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
