import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../i18n/i18n';
import styles from './ProjectPage.module.css';
import { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description?: string;
  bgImage?: string;
  benefits?: string[];
  useCases?: string;
  tags?: string[];
  published: boolean;
}

const ProjectPage = () => {
  const { slug } = useParams();
  const { t } = useI18n();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch(`/api/projects/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className={styles.projectPage}>Загрузка...</div>;

  if (!project) {
    return (
      <div
        className={styles.projectPage}
        style={{ textAlign: 'center', padding: '80px 24px', position: 'relative' }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>{t.project.notFound}</h1>
        <Link to="/" className="btn btn-primary">
          {t.project.back}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.projectPage}>
      <div className={styles.projectPageBg}>
        <img src={project.bgImage || '/projects/жк1.jpg'} alt={project.title} />
      </div>

      <div className={styles.projectCard}>
        <Link to="/" className={styles.projectBack}>
          {t.project.back}
        </Link>

        <h1 className={styles.projectTitle}>{project.title}</h1>
        <p className={styles.projectSubtitle}>{project.subtitle}</p>

        <p className={styles.projectDesc}>{project.description}</p>

        <div className={styles.projectSection}>
          <h3>{t.project.benefits}</h3>
          <ul className={styles.projectBenefits}>
            {(project.benefits || []).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div className={styles.projectSection}>
          <h3>{t.project.applied}</h3>
          <p>{project.useCases}</p>
        </div>

        <div className={styles.projectTags}>
          {(project.tags || []).map((tag) => (
            <span key={tag} className={styles.projectTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
