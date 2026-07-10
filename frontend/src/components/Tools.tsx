import { type FC } from 'react';
import { motion } from 'framer-motion';
import styles from './Tools.module.css';

const tools = [
  { name: 'React', src: 'https://skillicons.dev/icons?i=react' },
  { name: 'Node.js', src: 'https://skillicons.dev/icons?i=nodejs' },
  { name: 'Python', src: 'https://skillicons.dev/icons?i=python' },
  { name: 'Flutter', src: 'https://skillicons.dev/icons?i=flutter' },
  { name: 'Dart', src: 'https://skillicons.dev/icons?i=dart' },
  { name: 'Vite', src: 'https://skillicons.dev/icons?i=vite' },
  { name: 'TypeScript', src: 'https://skillicons.dev/icons?i=typescript' },
];

const Tools: FC = () => {
  return (
    <section className={styles.tools}>
      <div className={styles.toolsInner}>
        <h2 className={styles.toolsTitle}>На чём мы работаем</h2>

        <div className={styles.toolsIcons}>
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              className={styles.toolIcon}
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.1 }}
              aria-label={t.name}
              title={t.name}
            >
              <img src={t.src} alt={t.name} width="48" height="48" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
