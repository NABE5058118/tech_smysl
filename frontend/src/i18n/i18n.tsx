import { createContext, useContext, useState, type ReactNode, type FC } from 'react';

type Lang = 'ru' | 'en';

interface Translations {
  header: {
    about: string;
    portfolio: string;
    contacts: string;
    presentation: string;
    phone: string;
    logoAlt: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    slides: string[];
    cta: string;
    microNote: string;
    faq: {
      summary: string;
      answer: string;
    };
  };
  directions: {
    title: string;
    subtitle: string;
    viewAll: string;
    slides: {
      id: string;
      title: string;
      desc: string;
    }[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    rating: string;
    note: string;
    viewAll: string;
    items: {
      headline: string;
      body: string;
    }[];
  };
  cta: {
    label: string;
    title: string;
    text: string;
    button: string;
    ghost: string;
    microNote: string;
  };
  footer: {
    services: string;
    company: string;
    payment: string;
    documents: string;
    copy: string;
    disc: string;
  };
  project: {
    notFound: string;
    back: string;
    benefits: string;
    applied: string;
    projects: {
      id: string;
      title: string;
      subtitle: string;
      desc: string;
      benefits: string[];
      useCases: string;
      tags: string[];
    }[];
  };
}

const translations: Record<Lang, Translations> = {
  ru: {
    header: {
      about: 'Об агентстве',
      portfolio: 'Портфолио',
      contacts: 'Контакты',
      presentation: 'Презентация',
      phone: '+7 800 555 35 35',
      logoAlt: 'Тех Смысл',
    },
    hero: {
      eyebrow: 'Начнём работать вместе прямо сейчас',
      title: 'Техсмысл: +30 IT-решений ежегодно',
      slides: [
        'AR-решения и интерактинные инсталляции, сенсорные столы. Мобильные приложения под любые задачи. +40% вовлечённости клиентов.',
        'AR для перекраски и кастомизации. Меняем цвет мебели и интерьеров в один клик на смартфоне. —25% на рекламный бюджет.',
        '3D-визуализация с точностью до миллиметра. Индустрия: 150+ моделей. Сроки: без задержек. Гарантируем результат.',
        'Веб-сайты любой сложности: от корпоративных порталов до индивидуальных сервисов. Запуск за 30 дней. 99,9% аптайм.',
      ],
      cta: 'Получить расчёт проекта',
      microNote: 'Ответ в течение 15 минут · Можно в Telegram',
      faq: {
        summary: 'Сколько стоит разработка?',
        answer:
          'Фиксируем смету до старта. Оплата поэтапно. Гарантируем сроки или оплачиваем штраф.',
      },
    },
    directions: {
      title: 'Проекты',
      subtitle: '3D-визуализация, AR и интерактивные решения',
      viewAll: 'Все проекты',
      slides: [
        {
          id: '3d-nav',
          title: 'Интерактивная 3D-навигация',
          desc: 'Цифровая модель с перемещением: маршруты, помещения, парковки. –40% времени поиска.',
        },
        {
          id: '3d-houses',
          title: '3D-визуализация частных домов',
          desc: 'Фотореалистичные модели: архитектура, отделка, ландшафт. –25% на инвестиции.',
        },
        {
          id: '3d-complex',
          title: '3D-визуализация жилых комплексов',
          desc: 'Детализированные модели: +45% эффективность продаж.',
        },
        {
          id: '3d-mall',
          title: '3D-визуализация ТЦ и коммерции',
          desc: 'Презентация торговых центров: +50% инвестиций на ранних стадиях.',
        },
        {
          id: 'ar-app',
          title: 'AR-приложения для просмотра объектов',
          desc: 'Дополненная реальность: оценка объектов не выходя из дома. +55% готовности к покупке.',
        },
        {
          id: 'interactive',
          title: 'Интерактивные столы и инсталляции',
          desc: 'Решения для презентаций и навигации. +70% вовлечённости.',
        },
      ],
    },
    testimonials: {
      title: 'Истории успеха',
      subtitle: 'от 50+ клиентов',
      rating: '★ 4.8',
      note: 'Более 50 успешных проектов по веб-разработке, мобильным приложениям и AI',
      viewAll: 'Все отзывы',
      items: [
        {
          headline: 'Корпоративный портал: 500+ сотрудников, 0 багов в продакшене',
          body: 'Тех Смысл реализовала внутренний портал за 45 дней. Оперативная доставка, чистая архитектура, стабильная работа. +35% производительности команды.',
        },
        {
          headline: 'MVP стартапа: инвестиции привлечены, приложение в App Store',
          body: 'Разработали React-приложение с AI-функциями за 6 недель. Вышли на рынок, привлекли 2.5 млн ₽ инвестиций. Сэкономили клиенту 400 тыс. ₽.',
        },
        {
          headline: 'Миграция в облако AWS: без простоя 99,9% времени',
          body: 'Перешли инфраструктуру на AWS, настроили Kubernetes и CI/CD. Downtime — нулевой, поддержка круглосуточная. –30% на инфраструктурные расходы.',
        },
        {
          headline: 'Мобильное приложение: 5★ из 5, 10 000+ скачиваний',
          body: 'Flutter-приложение собрало сотни положительных отзывов. Чистый код, отзывчивый интерфейс. +70% удержание пользователей.',
        },
      ],
    },
    cta: {
      label: '+30 проектов в год · 99,9% аптайм',
      title: 'Нужна разработка, внедрение или поддержка?',
      text: 'Фиксируем смету до старта. Оплата поэтапно. Гарантируем сроки или выплачиваем штраф.',
      button: 'Получить расчёт проекта',
      ghost: 'Скачать кейс — как мы сэкономили клиенту 2 млн ₽',
      microNote: 'Ответ в течение 15 минут · Можно в Telegram',
    },
    footer: {
      services: 'Услуги',
      company: 'Компания',
      payment: 'Оплата',
      documents: 'Документы',
      copy: '© 2024–2026 Тех Смысл. Все права защищены.',
      disc: 'IT компания полного цикла. Разработка, внедрение и поддержка цифровых продуктов.',
    },
    project: {
      notFound: 'Проект не найден',
      back: '← На главную',
      benefits: 'Преимущества',
      applied: 'Где применяется',
      projects: [
        {
          id: '3d-nav',
          title: 'Интерактивная 3D-навигация',
          subtitle: 'Цифровые модели с свободным перемещением',
          desc: 'Интерактивная 3D-навигация: +60% удобства для посетителей, –40% времени поиска объектов.\n\nЦифровая модель объекта с возможностью свободного перемещения по территории или зданию. Пользователь может изучать маршруты, находить необходимые помещения.\n\nТакие решения востребованы в аэропортах, торговых центрах, жилых комплексах, бизнес-центрах и общественных пространствах.',
          benefits: [
            '+60% удобства для посетителей',
            '-40% времени поиска объектов',
            'Повышение привлекательности проекта для инвесторов',
            'Сокращение времени согласования проектных решений',
            'Возможность демонстрации до начала строительства',
            'Интеграция с цифровыми платформами',
          ],
          useCases:
            'Аэропорты, торговые центры, жилые комплексы, бизнес-центры, общественные пространства.',
          tags: ['3D', 'Навигация', 'Веб', 'Мобильные'],
        },
        {
          id: '3d-houses',
          title: '3D-визуализация частных домов и коттеджей',
          subtitle: 'Фотореалистичные модели до начала строительства',
          desc: '3D-визуализация: –25% на инвестиции в первом году, +35% кликов на рекламу.\n\nТехнологии трёхмерного моделирования позволяют создать точную цифровую копию будущего дома с учётом архитектурных решений, материалов отделки и особенностей участка.\n\nФотореалистичные изображения помогают заказчику увидеть конечный результат до начала строительства.',
          benefits: [
            '-25% на инвестиции в первом году',
            '+35% кликов на рекламу',
            'Снижение вероятности ошибок при реализации',
            'Упрощение согласования с заказчиком',
          ],
          useCases: 'Застройщики, архитектурные бюро и частные заказчики.',
          tags: ['3D', 'Визуализация', 'Архитектура'],
        },
        {
          id: '3d-complex',
          title: '3D-визуализация жилых комплексов',
          subtitle: 'Полная детализация до закладки фундамента',
          desc: '3D-визуализация жилых комплексов: +45% эффективность продаж, –30% возвратов клиентов.\n\nСовременная визуализация позволяет представить жилой комплекс ещё до начала строительства.\n\nДетализированные модели демонстрируют архитектуру зданий, благоустройство территории, озеленение, парковки.',
          benefits: [
            '+45% эффективность продаж',
            '-30% возвратов клиентов',
            'Оценка внешнего вида на этапе проектирования',
            'Презентация инвесторам без выезда',
          ],
          useCases: 'Девелоперы, застройщики, управляющие компании.',
          tags: ['3D', 'Жилая недвижимость', 'Девелопмент'],
        },
        {
          id: '3d-mall',
          title: '3D-визуализация торговых центров и коммерческих объектов',
          subtitle: 'Презентация концепций крупных коммерческих проектов',
          desc: '3D-визуализация ТЦ: +50% инвестиций на ранних стадиях, –20% на рекламный бюджет.\n\nДля крупных коммерческих проектов особенно важна качественная презентация концепции. Позволяет показать архитектурный облик здания, организацию входных групп, внутренние пространства.',
          benefits: [
            '+50% инвестиций на ранних стадиях',
            '-20% на рекламный бюджет',
            'Оценка потенциала объекта до строительства',
            'Демонстрация навигации и благоустройства',
          ],
          useCases: 'Торговые операторы, инвесторы, арендаторы.',
          tags: ['3D', 'Коммерческая недвижимость', 'ТЦ'],
        },
        {
          id: 'ar-app',
          title: 'AR-приложения для просмотра объектов и территорий',
          subtitle: 'Дополненная реальность для оценки объектов не выходя из дома',
          desc: 'AR-приложения: +55% готовности к покупке, –15% возвратов.\n\nРазработка AR-приложений, которые позволяют разместить цифровую модель объекта в реальном окружении через камеру смартфона.',
          benefits: [
            '+55% готовности к покупке',
            '-15% возвратов',
            'Визуализация в реальном окружении',
            'Интеграция с мобильными приложениями',
          ],
          useCases: 'Демонстрация коттеджных поселков, интерьеров, планировок участков.',
          tags: ['AR', 'Мобильные', '3D'],
        },
        {
          id: 'interactive',
          title: 'Интерактивные столы и инсталляции',
          subtitle: 'Решения для презентаций, навигации и аналитики',
          desc: 'Интерактивные столы: +70% вовлечённости аудитории, +30% времени в зоне.\n\nСоздаём интерактивные решения: презентации проектов для инвесторов, навигация на выставках, аналитические панели.',
          benefits: [
            '+70% вовлечённости аудитории',
            '+30% времени в зоне',
            'Многопользовательский режим',
            'Гибкая конфигурация под задачи',
            'Интеграция с внешними данными',
          ],
          useCases: 'Шоу-румы, выставки, бизнес-центры, событийные локации.',
          tags: ['Interactive', 'UX', 'Hardware'],
        },
      ],
    },
  },
  en: {
    header: {
      about: 'About',
      portfolio: 'Portfolio',
      contacts: 'Contacts',
      presentation: 'Presentation',
      phone: '+7 800 555 35 35',
      logoAlt: 'TechSense',
    },
    hero: {
      eyebrow: "Let's start working together right now",
      title: 'TechSense: +30 IT solutions annually',
      slides: [
        'AR solutions and interactive installations, touch tables. Mobile apps for any task. +40% customer engagement.',
        'AR for repainting and customization. Change furniture and interiors in one click on smartphone. –25% on ad budget.',
        '3D visualization accurate to millimeter. Industry: 150+ models. On time, guaranteed result.',
        'Websites of any complexity: from corporate portals to custom services. Launch in 30 days. 99.9% uptime.',
      ],
      cta: 'Get project estimate',
      microNote: 'Reply within 15 minutes · Available in Telegram',
      faq: {
        summary: 'How much does development cost?',
        answer:
          'We fix the budget before start. Payment in stages. We guarantee deadlines or pay penalty.',
      },
    },
    directions: {
      title: 'Projects',
      subtitle: '3D visualization, AR and interactive solutions',
      viewAll: 'All projects',
      slides: [
        {
          id: '3d-nav',
          title: 'Interactive 3D Navigation',
          desc: 'Digital model with movement: routes, rooms, parking. –40% search time.',
        },
        {
          id: '3d-houses',
          title: '3D Visualization of Private Houses',
          desc: 'Photorealistic models: architecture, finishes, landscape. –25% on investment.',
        },
        {
          id: '3d-complex',
          title: '3D Visualization of Residential Complexes',
          desc: 'Detailed models: +45% sales efficiency.',
        },
        {
          id: '3d-mall',
          title: '3D Mall and Commercial Visualization',
          desc: 'Presenting shopping centers: +50% early-stage investments.',
        },
        {
          id: 'ar-app',
          title: 'AR Apps for Object Viewing',
          desc: 'AR for evaluating objects without leaving home. +55% ready to buy.',
        },
        {
          id: 'interactive',
          title: 'Interactive Tables and Installations',
          desc: 'Solutions for presentations and navigation. +70% engagement.',
        },
      ],
    },
    testimonials: {
      title: 'Success Stories',
      subtitle: 'from 50+ clients',
      rating: '★ 4.8',
      note: '50+ successful projects in web development, mobile apps and AI',
      viewAll: 'All reviews',
      items: [
        {
          headline: 'Corporate portal: 500+ employees, 0 production bugs',
          body: 'TechSense delivered internal portal in 45 days. Fast delivery, clean architecture, stable operation. +35% team productivity.',
        },
        {
          headline: 'Startup MVP: investments secured, app in App Store',
          body: 'Developed React app with AI features in 6 weeks. Market launch, secured 2.5M ₽ in investment. Saved client 400K ₽.',
        },
        {
          headline: 'Cloud migration to AWS: 99.9% uptime',
          body: 'Migrated infrastructure to AWS, configured Kubernetes and CI/CD. Zero downtime, 24/7 support. –30% infrastructure costs.',
        },
        {
          headline: 'Mobile app: 5★ from 5, 10K+ downloads',
          body: 'Flutter app received hundreds of positive reviews. Clean code, responsive interface. +70% user retention.',
        },
      ],
    },
    cta: {
      label: '+30 projects per year · 99.9% uptime',
      title: 'Need development, integration or support?',
      text: 'We fix the budget before start. Payment in stages. We guarantee deadlines or pay penalty.',
      button: 'Get project estimate',
      ghost: 'Download case — how we saved client 2M ₽',
      microNote: 'Reply within 15 minutes · Available in Telegram',
    },
    footer: {
      services: 'Services',
      company: 'Company',
      payment: 'Payment',
      documents: 'Documents',
      copy: '© 2024–2026 TechSense. All rights reserved.',
      disc: 'Full-cycle IT company. Development, integration and support of digital products.',
    },
    project: {
      notFound: 'Project not found',
      back: '← Back to home',
      benefits: 'Benefits',
      applied: 'Use cases',
      projects: [
        {
          id: '3d-nav',
          title: 'Interactive 3D Navigation',
          subtitle: 'Free movement digital model',
          desc: '3D navigation: +60% visitor comfort, –40% search time. Digital model with free movement around territory or building. Solutions used in airports, shopping centers, residential complexes.',
          benefits: [
            '+60% visitor comfort',
            '-40% object search time',
            'Increased project attractiveness for investors',
            'Faster approval of solutions',
            'Demonstration before construction',
            'Integration with digital platforms',
          ],
          useCases:
            'Airports, shopping centers, residential complexes, business centers, public spaces.',
          tags: ['3D', 'Navigation', 'Web', 'Mobile'],
        },
        {
          id: '3d-houses',
          title: '3D Visualization of Private Houses',
          subtitle: 'Photorealistic models before construction',
          desc: '3D visualization: –25% first-year investment, +35% ad clicks. 3D modelling creates exact digital copy considering architectural solutions, finishing materials and site features.',
          benefits: [
            '–25% first-year investment',
            '+35% ad clicks',
            'Reduced implementation errors',
            'Simplified client approval',
          ],
          useCases: 'Developers, architectural firms and private clients.',
          tags: ['3D', 'Visualization', 'Architecture'],
        },
        {
          id: '3d-complex',
          title: '3D Visualization of Residential Complexes',
          subtitle: 'Full detail before foundation',
          desc: '3D residential complex visualization: +45% sales efficiency, –30% client returns. Detailed models show architecture, landscaping, parking, playgrounds.',
          benefits: [
            '+45% sales efficiency',
            '–30% client returns',
            'View exterior during design phase',
            'Investor presentation on-site',
          ],
          useCases: 'Developers, builders, management companies.',
          tags: ['3D', 'Residential', 'Development'],
        },
        {
          id: '3d-mall',
          title: '3D Mall and Commercial Visualization',
          subtitle: 'Commercial project concept presentation',
          desc: '3D mall visualization: +50% early-stage investment, –20% ad budget. Quality concept presentation shows architecture, entrance organization, interior spaces, relaxation zones.',
          benefits: [
            '+50% early-stage investment',
            '–20% ad budget',
            'Evaluate potential before construction',
            'Show navigation and landscaping',
          ],
          useCases: 'Retail operators, investors, tenants.',
          tags: ['3D', 'Commercial Real Estate', 'Mall'],
        },
        {
          id: 'ar-app',
          title: 'AR Apps for Object Viewing',
          subtitle: 'Augmented reality for home evaluation',
          desc: 'AR apps: +55% purchase readiness, –15% returns. AR apps let users place and explore digital models in real environment via smartphone camera.',
          benefits: [
            '+55% purchase readiness',
            '–15% returns',
            'Visualization in real environment',
            'Integration with mobile apps',
          ],
          useCases: 'Suburban settlements, interiors, site plans, urban infrastructure.',
          tags: ['AR', 'Mobile', '3D'],
        },
        {
          id: 'interactive',
          title: 'Interactive Tables and Installations',
          subtitle: 'For presentations, navigation and analytics',
          desc: 'Interactive tables: +70% audience engagement, +30% time in zone. Interactive solutions for investor presentations, exhibition navigation, analytical dashboards.',
          benefits: [
            '+70% audience engagement',
            '+30% time in interactive zone',
            'Multi-user mode',
            'Flexible configuration',
            'External data integration',
          ],
          useCases: 'Showrooms, exhibitions, business centers, event venues.',
          tags: ['Interactive', 'UX', 'Hardware'],
        },
      ],
    },
  },
};

interface I18nContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('ru');
  return (
    <I18nContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
