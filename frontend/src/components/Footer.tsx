import { type FC } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import styles from './Footer.module.css';
import { useI18n } from '../i18n/i18n';

const Footer: FC = () => {
  const { t, lang } = useI18n();

  const service =
    lang === 'ru'
      ? [
          'Разработка сайтов',
          'Мобильные приложения',
          'AI и ML',
          'Облачная инфраструктура',
          'IT-аутсорсинг',
          'Тестирование',
        ]
      : [
          'Web Development',
          'Mobile Apps',
          'AI & ML',
          'Cloud Infrastructure',
          'IT Outsourcing',
          'Testing',
        ];

  const company =
    lang === 'ru'
      ? ['О компании', 'Команда', 'Вакансии', 'Портфолио', 'Контакты']
      : ['About', 'Team', 'Careers', 'Portfolio', 'Contacts'];

  const documents =
    lang === 'ru'
      ? ['Политика конфиденциальности', 'Пользовательское соглашение', 'Оферта']
      : ['Privacy Policy', 'Terms of Service', 'Offer'];

  const payment =
    lang === 'ru'
      ? ['Банковские карты', 'Рассрочка 0%', 'Безналичный расчёт']
      : ['Bank cards', '0% installment', 'Bank transfer'];

  const socials = [
    {
      name: 'Telegram',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.13-.99 3.57-1.65 4.3-1.97 2.19-.97 2.64-.96 3.62-.82.71.1 1.3.41 1.65.82.42.51.42 1.17.29 1.82z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: 'VK',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.744-.576.744z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWave} aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
          <path
            fill="#000"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      <div className={styles.footerBrand}>
        <Link to="/" aria-label={t.header.logoAlt}>
          <img src={Logo} alt={t.header.logoAlt} />
        </Link>
      </div>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerTop}>
            <div className={styles.footerCols}>
              <div className={styles.footerCol}>
                <p className={styles.footerColHead}>{t.footer.services}</p>
                <ul className={styles.footerLinks}>
                  {service.map((l) => (
                    <li key={l}>
                      <a href="#" className={styles.footerLink}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.footerCol}>
                <p className={styles.footerColHead}>{t.footer.company}</p>
                <ul className={styles.footerLinks}>
                  {company.map((l) => (
                    <li key={l}>
                      <a href="#" className={styles.footerLink}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.footerCol}>
                <p className={styles.footerColHead}>{t.footer.payment}</p>
                <ul className={styles.footerLinks}>
                  {payment.map((l) => (
                    <li key={l}>
                      <a href="#" className={styles.footerLink}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.footerCol}>
                <p className={styles.footerColHead}>{t.footer.documents}</p>
                <ul className={styles.footerLinks}>
                  {documents.map((l) => (
                    <li key={l}>
                      <a href="#" className={styles.footerLink}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.footerSocials}>
              {socials.map((s) => (
                <a key={s.name} href="#" className={styles.footerSoc} aria-label={s.name}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>{t.footer.copy}</p>
          <p className={styles.footerDisc}>{t.footer.disc}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
