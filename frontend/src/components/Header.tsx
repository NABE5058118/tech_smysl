import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import styles from './Header.module.css';
import { useI18n } from '../i18n/i18n';
import { api } from '../api/api';

interface Presentation {
  id: string;
  title: string;
  fileUrl: string;
}

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const { lang, t, setLang } = useI18n();

  useEffect(() => {
    void api.presentations
      .getAll()
      .then(setPresentations)
      .catch(() => void 0);
  }, []);

  const links = [
    { label: t.header.about, dropdown: true },
    { label: t.header.portfolio, dropdown: true },
    { label: t.header.contacts, dropdown: true },
    ...(presentations.length > 0
      ? [{ label: t.header.presentation, download: true, items: presentations }]
      : []),
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navLogo}>
          <Link to="/" aria-label={t.header.logoAlt}>
            <img src={Logo} alt={t.header.logoAlt} />
          </Link>
        </div>

        <nav className={styles.navMenu}>
          <ul className={styles.navList}>
            {links.map((l) => (
              <li key={l.label}>
                {l.items && l.items.length > 0 ? (
                  <>
                    <a href="#" className={styles.navLink}>
                      {l.label}
                      {l.download && <span className={styles.dlIcon}>⬇</span>}
                    </a>
                    <ul className={styles.dropdown}>
                      {l.items.map((item) => (
                        <li key={item.id}>
                          <a href={item.fileUrl} download className={styles.dropdownLink}>
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a href="#" className={styles.navLink}>
                    {l.label}
                    {l.dropdown && <span className={styles.chevron}>▼</span>}
                    {l.download && <span className={styles.dlIcon}>⬇</span>}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.navbarRight}>
          <button className={styles.langBtn} onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>
            <span className={lang === 'ru' ? styles.langActive : styles.langInactive}>Рус</span>
            <span className={styles.langSep}>|</span>
            <span className={lang === 'en' ? styles.langActive : styles.langInactive}>Eng</span>
          </button>
          <a className={styles.navPhone} href="tel:+78005553535">
            {t.header.phone}
          </a>
          {import.meta.env.DEV && (
            <a className={styles.adminLink} href="/admin" aria-label="Admin panel">
              ⚙️
            </a>
          )}
        </div>

        <button className={styles.burger} onClick={() => setOpen(!open)} aria-label="Меню">
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <a href="#" onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.mobileDrawerFooter}>
              <button
                className={styles.langBtn}
                onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
              >
                <span className={lang === 'ru' ? styles.langActive : styles.langInactive}>Рус</span>
                <span className={styles.langSep}>|</span>
                <span className={lang === 'en' ? styles.langActive : styles.langInactive}>Eng</span>
              </button>
              <a className={styles.navPhone} href="tel:+78005553535">
                {t.header.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
