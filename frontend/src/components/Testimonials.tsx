import { type FC } from 'react';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';
import { useI18n } from '../i18n/i18n';

const Testimonials: FC = () => {
  const { t } = useI18n();

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsInner}>
        <div className={styles.testimonialsHead}>
          <h2 className={styles.testimonialsTitle}>
            {t.testimonials.title}
            <br />
            {t.testimonials.subtitle}
          </h2>
          <div className={styles.testimonialsNoteWrap}>
            <span className={styles.testimonialsStar}>{t.testimonials.rating}</span>
            <p className={styles.testimonialsNote}>{t.testimonials.note}</p>
          </div>
        </div>

        <div className={styles.tAllBtn}>
          <a href="#" className="btn-outline-sm">
            {t.testimonials.viewAll}
          </a>
        </div>

        <div className={styles.testimonialsGrid}>
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              className={styles.tCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className={styles.tCardText}>
                {item.headline}
                <span>{item.body}</span>
              </div>
              <div className={styles.tAuthor}>
                <div className={styles.tAvatar} />
                <div>
                  <p className={styles.tName}>—</p>
                  <p className={styles.tRole}>—</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
