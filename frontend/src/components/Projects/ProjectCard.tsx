import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

export type Project = {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
};

type ProjectCardProps = {
  project: Project;
  index?: number;
};

const ProjectCard: FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const sharedImageProps = {
    src: project.imageUrl,
    alt: project.title,
    loading: 'lazy' as const,
  };

  return (
    <motion.article
      className={styles.ProjectCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/projects/${project.id}`} className={styles.ProjectCardLink}>
        <div className={styles.ProjectCardInner}>
          <div className={styles.ProjectCardLeft}>
            <img {...sharedImageProps} />
            <h3 className={styles.ProjectCardTitle}>{project.title}</h3>
            {project.subtitle && <p className={styles.ProjectCardSubtitle}>{project.subtitle}</p>}
          </div>
          <div className={styles.ProjectCardRight}>
            <img {...sharedImageProps} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProjectCard;
