import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';
import { useI18n } from '../i18n/i18n';
import { api } from '../api/api';

const TYPING_SPEED = 30;
const PAUSE_DURATION = 3000;
const ERASE_SPEED = 20;
const SLIDE_TRANSITION = 500;

interface HeroSlide {
  id: string;
  imageUrl: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  order: number;
}

const Hero: FC = () => {
  const { t } = useI18n();
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    void api.heroSlides
      .getAll()
      .then(setHeroSlides)
      .catch(() => void 0);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const texts =
      heroSlides.length > 0 ? heroSlides.map((s) => s.subtitle || s.title || '') : t.hero.slides;

    const fullText = texts[currentSlide] || '';

    if (isTyping) {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, ERASE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % texts.length);
          setIsTyping(true);
        }, SLIDE_TRANSITION);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentSlide, heroSlides, t.hero.slides]);

  const imageSrc =
    heroSlides.length > 0
      ? heroSlides[currentSlide]?.imageUrl || ''
      : `https://picsum.photos/seed/${currentSlide}/800/600`;

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.heroEyebrowWrap}>
            <span className={styles.heroEyebrowBar} />
            <span className={styles.heroEyebrow}>{t.hero.eyebrow}</span>
          </div>

          <h1 className={styles.heroTitle}>{t.hero.title}</h1>

          <p className={styles.heroSub}>{displayText}</p>

          <div className={styles.heroActions}>
            <button className={styles.btnRed}>{t.hero.cta}</button>
            <span className={styles.microNote}>{t.hero.microNote}</span>
          </div>

          <div className={styles.heroFaq}>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>{t.hero.faq.summary}</summary>
              <p className={styles.faqAnswer}>{t.hero.faq.answer}</p>
            </details>
          </div>
        </div>

        <div className={styles.heroImage}>
          {imageSrc && (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={imageSrc}
                alt={heroSlides[currentSlide]?.imageAlt || `Slide ${currentSlide + 1}`}
                className={styles.heroImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
