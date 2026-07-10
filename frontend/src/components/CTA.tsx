import { type FC } from 'react';
import { motion } from 'framer-motion';
import styles from './CTA.module.css';
import { useI18n } from '../i18n/i18n';

const CTA: FC = () => {
  const { t } = useI18n();

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <div className={styles.ctaLeft}>
          <p className={styles.ctaLabel}>{t.cta.label}</p>
          <h2 className={styles.ctaTitle}>{t.cta.title}</h2>
          <p className={styles.ctaText}>{t.cta.text}</p>
          <div className={styles.ctaActions}>
            <button className="btn btn-primary">{t.cta.button}</button>
            <button className={styles.ctaGhost}>{t.cta.ghost}</button>
          </div>
          <span className={styles.microNote}>{t.cta.microNote}</span>
        </div>

        <motion.div
          className={styles.ctaVideo}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 260 }}
        >
          <button className={styles.ctaPlay} aria-label="Смотреть видео">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
