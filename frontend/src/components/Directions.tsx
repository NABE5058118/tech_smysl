import { type FC, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Directions.module.css';

interface Project {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  bgImage?: string;
  published: boolean;
}

const Directions: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    void fetch('/api/projects?all=true')
      .then((r) => r.json())
      .then((data: Project[]) => setProjects(data.filter((p) => p.published)))
      .catch(() => {
        setProjects([]);
      });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className={styles.directions}>
      <div className={styles.directionsInner}>
        <div className={styles.directionsHead}>
          <div>
            <h2 className={styles.directionsTitle}>Проекты</h2>
            <p className={styles.directionsSubtitle}>3D-визуализация, AR и интерактивные решения</p>
          </div>
          <Link to="/projects" className="btn btn-outline-white">
            Все проекты
          </Link>
        </div>

        <div className={styles.directionsCarouselWrap}>
          <div className={styles.directionsGrid} ref={scrollRef}>
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/projects/${project.slug || project.id}`}
                  className={styles.projectCardLink}
                >
                  <div className={styles.projectCardMedia}>
                    <img
                      src={project.imageUrl || project.bgImage || '/projects/жк1.jpg'}
                      alt={project.title}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/projects/жк1.jpg';
                      }}
                    />
                  </div>
                  <div className={styles.projectCardBody}>
                    <h3 className={styles.projectCardTitle}>{project.title}</h3>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        <div className={styles.dirNav}>
          <button className={styles.dirArrow} onClick={() => scroll('left')} aria-label="Назад">
            ‹
          </button>
          <button className={styles.dirArrow} onClick={() => scroll('right')} aria-label="Вперёд">
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Directions;
