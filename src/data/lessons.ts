export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'order-words' | 'true-false' | 'speaking';
  question: string;
  questionEs: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  explanationEs: string;
  context?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  xp: number;
  content: {
    theory: string;
    theoryEs: string;
    examples: Array<{ en: string; es: string }>;
    keywords: string[];
  };
  exercises: Exercise[];
  completed: boolean;
  progress: number;
}

export interface Module {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: 'fundamentos',
    title: 'Foundations',
    titleEs: 'Fundamentos',
    description: 'Present yourself, basic grammar, and essential workplace phrases.',
    descriptionEs: 'Preséntate, gramática básica y frases esenciales del trabajo.',
    icon: 'Sparkles',
    color: '#A02B8A',
    lessons: [
      {
        id: 'l1-intro',
        moduleId: 'fundamentos',
        title: 'Introducing Yourself',
        titleEs: 'Presentándote',
        description: 'Learn to introduce yourself professionally for your new role.',
        descriptionEs: 'Aprende a presentarte profesionalmente para tu nuevo puesto.',
        level: 'beginner',
        duration: 10,
        xp: 20,
        content: {
          theory: 'When introducing yourself professionally, use the Present Simple tense. Structure: Name + Role + Company + Experience. Use connectors like "and", "also", "currently" to link ideas.',
          theoryEs: 'Al presentarte profesionalmente, usa el Presente Simple. Estructura: Nombre + Cargo + Empresa + Experiencia.',
          examples: [
            { en: 'My name is Rebeca and I am the Content Communication Manager at Menarini.', es: 'Mi nombre es Rebeca y soy la Jefa de Comunicación de Contenido en Menarini.' },
            { en: 'I have five years of experience in digital marketing and content strategy.', es: 'Tengo cinco años de experiencia en marketing digital y estrategia de contenido.' },
            { en: 'I am responsible for leading a team of five people, including a web master and a designer.', es: 'Soy responsable de liderar un equipo de cinco personas, incluyendo un web master y un diseñador.' },
            { en: 'Our goal is to create high-quality content that supports Menarini\'s mission in healthcare.', es: 'Nuestro objetivo es crear contenido de alta calidad que apoye la misión de Menarini en salud.' },
          ],
          keywords: ['introduce', 'manager', 'responsible', 'experience', 'team', 'goal'],
        },
        exercises: [
          {
            id: 'e1-1',
            type: 'fill-blank',
            question: 'My name ______ Rebeca and I ______ the Content Manager.',
            questionEs: 'Completa con el verbo correcto (be)',
            correctAnswer: 'is,am',
            explanation: 'Use "is" for third person (he/she/it) and "am" for first person (I).',
            explanationEs: 'Usa "is" para tercera persona y "am" para primera persona (I).',
            options: ['is,am', 'am,is', 'are,am', 'is,are'],
          },
          {
            id: 'e1-2',
            type: 'multiple-choice',
            question: 'Which sentence is correct for introducing your team?',
            questionEs: '¿Qué oración es correcta para presentar tu equipo?',
            correctAnswer: 'I lead a team of five people.',
            explanation: '"Lead" means to guide or be in charge of a team.',
            explanationEs: '"Lead" significa guiar o estar a cargo de un equipo.',
            options: [
              'I lead a team of five people.',
              'I leading a team of five people.',
              'I leads a team of five people.',
              'I am lead a team of five people.',
            ],
          },
          {
            id: 'e1-3',
            type: 'order-words',
            question: 'Put the words in the correct order:',
            questionEs: 'Ordena las palabras:',
            correctAnswer: 'I am responsible for the content strategy at Menarini.',
            explanation: 'Subject + verb "to be" + adjective + preposition + object.',
            explanationEs: 'Sujeto + verbo "to be" + adjetivo + preposición + objeto.',
            options: ['I', 'am', 'responsible', 'for', 'the', 'content', 'strategy', 'at', 'Menarini.'],
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l2-daily',
        moduleId: 'fundamentos',
        title: 'Daily Routines at Work',
        titleEs: 'Rutinas Diarias en el Trabajo',
        description: 'Describe your daily activities using Present Simple.',
        descriptionEs: 'Describe tus actividades diarias usando el Presente Simple.',
        level: 'beginner',
        duration: 12,
        xp: 20,
        content: {
          theory: 'Present Simple is used for habits and routines. Third person singular adds -s or -es. Time expressions: every day, usually, often, sometimes, always.',
          theoryEs: 'El Presente Simple se usa para hábitos y rutinas. La tercera persona singular añade -s o -es.',
          examples: [
            { en: 'I check my emails every morning at 8 AM.', es: 'Reviso mis correos cada mañana a las 8.' },
            { en: 'She coordinates with the design team on Tuesdays.', es: 'Ella coordina con el equipo de diseño los martes.' },
            { en: 'We review the content calendar every Monday.', es: 'Revisamos el calendario de contenido cada lunes.' },
            { en: 'The web master updates the website daily.', es: 'El web master actualiza el sitio web diariamente.' },
          ],
          keywords: ['check', 'coordinate', 'review', 'update', 'daily', 'every'],
        },
        exercises: [
          {
            id: 'e2-1',
            type: 'fill-blank',
            question: 'She ______ (review) the SEO analytics every Friday.',
            questionEs: 'Completa con la forma correcta del verbo.',
            correctAnswer: 'reviews',
            explanation: 'Third person singular adds -s to the verb.',
            explanationEs: 'La tercera persona del singular añade -s al verbo.',
            options: ['review', 'reviews', 'reviewing', 'reviewed'],
          },
          {
            id: 'e2-2',
            type: 'true-false',
            question: '"I am checks my emails every morning" is grammatically correct.',
            questionEs: '¿"I am checks my emails every morning" es gramaticalmente correcto?',
            correctAnswer: 'False',
            explanation: '"Am checking" (continuous) or "check" (simple) are correct, but never "am checks".',
            explanationEs: '"Am checking" (continuo) o "check" (simple) son correctos, pero nunca "am checks".',
            options: ['True', 'False'],
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l3-numbers',
        moduleId: 'fundamentos',
        title: 'Numbers, Dates & Times',
        titleEs: 'Números, Fechas y Horas',
        description: 'Master numbers and time expressions for scheduling.',
        descriptionEs: 'Domina números y expresiones de tiempo para agendar.',
        level: 'beginner',
        duration: 8,
        xp: 15,
        content: {
          theory: 'In English, dates are written month/day/year (US) or day/month/year (UK). Use "at" for times, "on" for days/dates, "in" for months/years.',
          theoryEs: 'En inglés, las fechas se escriben mes/día/año. Usa "at" para horas, "on" para días, "in" para meses.',
          examples: [
            { en: 'The meeting is on May 15th at 10 AM.', es: 'La reunión es el 15 de mayo a las 10 AM.' },
            { en: 'Menarini was founded in 1886.', es: 'Menarini fue fundada en 1886.' },
            { en: 'The deadline is on Friday, June 20th.', es: 'La fecha límite es el viernes 20 de junio.' },
          ],
          keywords: ['at', 'on', 'in', 'deadline', 'meeting', 'schedule'],
        },
        exercises: [
          {
            id: 'e3-1',
            type: 'multiple-choice',
            question: 'Choose the correct preposition: The campaign launches ______ July.',
            questionEs: 'Elige la preposición correcta.',
            correctAnswer: 'in',
            explanation: 'Use "in" for months, years, and seasons.',
            explanationEs: 'Usa "in" para meses, años y estaciones.',
            options: ['at', 'on', 'in', 'by'],
          },
        ],
        completed: false,
        progress: 0,
      },
    ],
  },
  {
    id: 'menarini',
    title: 'Menarini & Pharma',
    titleEs: 'Menarini y Pharma',
    description: 'Learn vocabulary and context about Menarini and the pharmaceutical industry.',
    descriptionEs: 'Aprende vocabulario y contexto sobre Menarini y la industria farmacéutica.',
    icon: 'Building2',
    color: '#005C3D',
    lessons: [
      {
        id: 'l4-about',
        moduleId: 'menarini',
        title: 'About Menarini',
        titleEs: 'Sobre Menarini',
        description: 'Learn to talk about Menarini: history, mission, and presence.',
        descriptionEs: 'Aprende a hablar sobre Menarini: historia, misión y presencia.',
        level: 'intermediate',
        duration: 15,
        xp: 25,
        content: {
          theory: 'Menarini is an Italian pharmaceutical company founded in 1886 in Florence, Italy. It operates in over 140 countries with more than 17,000 employees. Key therapeutic areas include cardiology, oncology, gastroenterology, and dermatology.',
          theoryEs: 'Menarini es una empresa farmacéutica italiana fundada en 1886 en Florencia. Opera en más de 140 países con más de 17,000 empleados.',
          examples: [
            { en: 'Menarini is a leading pharmaceutical company with a strong presence in Europe, Asia, and Latin America.', es: 'Menarini es una empresa farmacéutica líder con fuerte presencia en Europa, Asia y Latinoamérica.' },
            { en: 'The company was founded in Florence, Italy, in 1886.', es: 'La empresa fue fundada en Florencia, Italia, en 1886.' },
            { en: 'Menarini operates in over 140 countries worldwide.', es: 'Menarini opera en más de 140 países en todo el mundo.' },
            { en: 'Their mission is to provide innovative healthcare solutions to improve patients\' lives.', es: 'Su misión es proporcionar soluciones innovadoras de salud para mejorar la vida de los pacientes.' },
          ],
          keywords: ['pharmaceutical', 'founded', 'therapeutic', 'mission', 'healthcare', 'patients'],
        },
        exercises: [
          {
            id: 'e4-1',
            type: 'fill-blank',
            question: 'Menarini ______ (found) in Florence in 1886.',
            questionEs: 'Usa la voz pasiva correcta.',
            correctAnswer: 'was founded',
            explanation: 'Use past passive: was/were + past participle for events in history.',
            explanationEs: 'Usa la pasiva en pasado: was/were + participio pasado para eventos históricos.',
            options: ['founded', 'was founded', 'is founded', 'has founded'],
          },
          {
            id: 'e4-2',
            type: 'multiple-choice',
            question: 'Complete: Menarini operates ______ over 140 countries.',
            questionEs: 'Completa con la preposición correcta.',
            correctAnswer: 'in',
            explanation: '"Operate in" is the correct collocation for countries/regions.',
            explanationEs: '"Operate in" es la colocación correcta para países/regiones.',
            options: ['on', 'at', 'in', 'by'],
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l5-therapeutic',
        moduleId: 'menarini',
        title: 'Therapeutic Areas',
        titleEs: 'Áreas Terapéuticas',
        description: 'Vocabulary for discussing medical specialties and treatments.',
        descriptionEs: 'Vocabulario para hablar de especialidades médicas y tratamientos.',
        level: 'intermediate',
        duration: 12,
        xp: 25,
        content: {
          theory: 'Menarini focuses on several key therapeutic areas. Learn the vocabulary to discuss these areas professionally.',
          theoryEs: 'Menarini se enfoca en varias áreas terapéuticas clave.',
          examples: [
            { en: 'Cardiology deals with diseases of the heart and blood vessels.', es: 'La cardiología trata enfermedades del corazón y vasos sanguíneos.' },
            { en: 'Oncology focuses on the diagnosis and treatment of cancer.', es: 'La oncología se enfoca en el diagnóstico y tratamiento del cáncer.' },
            { en: 'Gastroenterology covers the digestive system and its disorders.', es: 'La gastroenterología cubre el sistema digestivo y sus trastornos.' },
            { en: 'Dermatology is the branch of medicine dealing with the skin.', es: 'La dermatología es la rama de la medicina que trata la piel.' },
          ],
          keywords: ['cardiology', 'oncology', 'gastroenterology', 'dermatology', 'treatment', 'diagnosis'],
        },
        exercises: [
          {
            id: 'e5-1',
            type: 'multiple-choice',
            question: 'Which area focuses on cancer treatment?',
            questionEs: '¿Qué área se enfoca en el tratamiento del cáncer?',
            correctAnswer: 'Oncology',
            explanation: 'Oncology is the study and treatment of cancer.',
            explanationEs: 'Oncología es el estudio y tratamiento del cáncer.',
            options: ['Cardiology', 'Oncology', 'Gastroenterology', 'Dermatology'],
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l6-products',
        moduleId: 'menarini',
        title: 'Products & Portfolio',
        titleEs: 'Productos y Portafolio',
        description: 'Discuss pharmaceutical products, research, and development.',
        descriptionEs: 'Habla sobre productos farmacéuticos, investigación y desarrollo.',
        level: 'intermediate',
        duration: 14,
        xp: 25,
        content: {
          theory: 'Menarini\'s product portfolio spans prescription medicines, consumer health products, and diagnostics. Key terms: pipeline, clinical trials, regulatory approval.',
          theoryEs: 'El portafolio de Menarini abarca medicamentos, productos de salud para el consumidor y diagnósticos.',
          examples: [
            { en: 'Our product pipeline includes several innovative treatments in development.', es: 'Nuestra línea de productos incluye varios tratamientos innovadores en desarrollo.' },
            { en: 'Clinical trials are essential to ensure the safety and efficacy of new drugs.', es: 'Los ensayos clínicos son esenciales para garantizar la seguridad y eficacia de nuevos medicamentos.' },
            { en: 'The drug received regulatory approval from the European Medicines Agency.', es: 'El medicamento recibió aprobación regulatoria de la Agencia Europea de Medicamentos.' },
          ],
          keywords: ['pipeline', 'clinical trials', 'regulatory approval', 'efficacy', 'safety'],
        },
        exercises: [
          {
            id: 'e6-1',
            type: 'fill-blank',
            question: 'New drugs must pass ______ ______ before they can be sold.',
            questionEs: 'Nuevos medicamentos deben pasar...',
            correctAnswer: 'clinical trials',
            explanation: 'Clinical trials test safety and efficacy before market approval.',
            explanationEs: 'Los ensayos clínicos prueban seguridad y eficacia antes de la aprobación.',
          },
        ],
        completed: false,
        progress: 0,
      },
    ],
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Marketing',
    titleEs: 'SEO y Marketing',
    description: 'Digital marketing vocabulary, SEO terms, and content strategy language.',
    descriptionEs: 'Vocabulario de marketing digital, términos de SEO y lenguaje de estrategia de contenido.',
    icon: 'TrendingUp',
    color: '#2563EB',
    lessons: [
      {
        id: 'l7-seo-basics',
        moduleId: 'seo-marketing',
        title: 'SEO Fundamentals',
        titleEs: 'Fundamentos de SEO',
        description: 'Learn essential SEO terminology and concepts.',
        descriptionEs: 'Aprende terminología y conceptos esenciales de SEO.',
        level: 'intermediate',
        duration: 15,
        xp: 25,
        content: {
          theory: 'SEO (Search Engine Optimization) improves website visibility on search engines. Key concepts: keywords, backlinks, meta descriptions, organic traffic.',
          theoryEs: 'SEO mejora la visibilidad del sitio web en motores de búsqueda.',
          examples: [
            { en: 'We need to optimize our meta descriptions to improve click-through rates.', es: 'Necesitamos optimizar nuestras meta descripciones para mejorar las tasas de clic.' },
            { en: 'High-quality backlinks from reputable sites boost our domain authority.', es: 'Enlaces de calidad desde sitios reputados aumentan nuestra autoridad de dominio.' },
            { en: 'Keyword research helps us understand what our audience is searching for.', es: 'La investigación de palabras clave nos ayuda a entender qué busca nuestra audiencia.' },
            { en: 'Organic traffic has increased by 35% since we implemented the new SEO strategy.', es: 'El tráfico orgánico ha aumentado un 35% desde que implementamos la nueva estrategia SEO.' },
          ],
          keywords: ['SEO', 'keywords', 'backlinks', 'organic traffic', 'meta description', 'domain authority'],
        },
        exercises: [
          {
            id: 'e7-1',
            type: 'multiple-choice',
            question: 'What does "organic traffic" mean?',
            questionEs: '¿Qué significa "tráfico orgánico"?',
            correctAnswer: 'Visitors who find your site through unpaid search results.',
            explanation: 'Organic traffic comes from natural search results, not paid ads.',
            explanationEs: 'El tráfico orgánico proviene de resultados de búsqueda naturales, no anuncios pagados.',
            options: [
              'Visitors who find your site through paid advertisements.',
              'Visitors who find your site through unpaid search results.',
              'Visitors who come directly by typing your URL.',
              'Visitors from social media platforms.',
            ],
          },
          {
            id: 'e7-2',
            type: 'fill-blank',
            question: '______ ______ involves finding the words and phrases people use when searching online.',
            questionEs: 'Implica encontrar las palabras que la gente usa al buscar en línea.',
            correctAnswer: 'Keyword research',
            explanation: 'Keyword research identifies search terms your audience uses.',
            explanationEs: 'La investigación de palabras clave identifica los términos de búsqueda de tu audiencia.',
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l8-content',
        moduleId: 'seo-marketing',
        title: 'Content Strategy',
        titleEs: 'Estrategia de Contenido',
        description: 'Language for planning, creating, and measuring content.',
        descriptionEs: 'Lenguaje para planificar, crear y medir contenido.',
        level: 'intermediate',
        duration: 12,
        xp: 25,
        content: {
          theory: 'A content strategy outlines how content will be created, published, and managed. Key verbs: plan, create, publish, distribute, measure, optimize.',
          theoryEs: 'Una estrategia de contenido define cómo se creará, publicará y gestionará el contenido.',
          examples: [
            { en: 'We plan our content calendar three months in advance.', es: 'Planificamos nuestro calendario de contenido con tres meses de anticipación.' },
            { en: 'The editorial team creates blog posts, videos, and infographics.', es: 'El equipo editorial crea artículos, videos e infografías.' },
            { en: 'We measure content performance using analytics tools.', es: 'Medimos el rendimiento del contenido usando herramientas de analítica.' },
          ],
          keywords: ['content calendar', 'editorial', 'publish', 'distribute', 'analytics', 'engagement'],
        },
        exercises: [
          {
            id: 'e8-1',
            type: 'order-words',
            question: 'Order the content workflow:',
            questionEs: 'Ordena el flujo de trabajo de contenido:',
            correctAnswer: 'Plan, create, publish, measure, optimize.',
            explanation: 'The standard content workflow follows this sequence.',
            explanationEs: 'El flujo de trabajo de contenido estándar sigue esta secuencia.',
            options: ['create,', 'measure,', 'optimize.', 'Plan,', 'publish,'],
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l9-social',
        moduleId: 'seo-marketing',
        title: 'Social Media & Engagement',
        titleEs: 'Redes Sociales y Engagement',
        description: 'Vocabulary for social media management and audience engagement.',
        descriptionEs: 'Vocabulario para gestión de redes sociales y engagement de audiencia.',
        level: 'intermediate',
        duration: 10,
        xp: 20,
        content: {
          theory: 'Social media engagement measures how users interact with content. KPIs: reach, impressions, clicks, shares, comments, conversion rate.',
          theoryEs: 'El engagement en redes sociales mide cómo los usuarios interactúan con el contenido.',
          examples: [
            { en: 'Our latest post reached over 50,000 people on LinkedIn.', es: 'Nuestra última publicación llegó a más de 50,000 personas en LinkedIn.' },
            { en: 'The engagement rate on our healthcare content is 4.5%.', es: 'La tasa de engagement en nuestro contenido de salud es del 4.5%.' },
            { en: 'We need to improve our call-to-action to increase conversions.', es: 'Necesitamos mejorar nuestra llamada a la acción para aumentar las conversiones.' },
          ],
          keywords: ['engagement', 'reach', 'impressions', 'conversion', 'call-to-action', 'KPI'],
        },
        exercises: [
          {
            id: 'e9-1',
            type: 'multiple-choice',
            question: 'A "call-to-action" (CTA) is:',
            questionEs: 'Una "llamada a la acción" (CTA) es:',
            correctAnswer: 'A prompt that encourages users to take a specific action.',
            explanation: 'CTAs guide users toward actions like "Sign up", "Learn more", or "Download".',
            explanationEs: 'Las CTAs guían a los usuarios hacia acciones como "Regístrate", "Más info" o "Descargar".',
            options: [
              'A phone call to a customer.',
              'A prompt that encourages users to take a specific action.',
              'An action taken by the marketing team.',
              'A type of social media post.',
            ],
          },
        ],
        completed: false,
        progress: 0,
      },
    ],
  },
  {
    id: 'grammar-b1',
    title: 'Grammar B1 Level',
    titleEs: 'Gramática Nivel B1',
    description: 'Essential grammar for the Cambridge B1 First exam.',
    descriptionEs: 'Gramática esencial para el examen Cambridge B1 First.',
    icon: 'BookOpen',
    color: '#DC2626',
    lessons: [
      {
        id: 'l10-past',
        moduleId: 'grammar-b1',
        title: 'Past Tenses',
        titleEs: 'Tiempos Pasados',
        description: 'Past Simple vs Past Continuous vs Present Perfect.',
        descriptionEs: 'Pasado Simple vs Pasado Continuo vs Presente Perfecto.',
        level: 'intermediate',
        duration: 15,
        xp: 25,
        content: {
          theory: 'Past Simple: completed actions (yesterday, last week, in 2020). Past Continuous: actions in progress at a specific time in the past. Present Perfect: actions connected to the present (ever, never, already, yet, since, for).',
          theoryEs: 'Pasado Simple: acciones completadas. Pasado Continuo: acciones en progreso. Presente Perfecto: acciones conectadas al presente.',
          examples: [
            { en: 'I finished the report yesterday. (Past Simple)', es: 'Terminé el informe ayer.' },
            { en: 'I was finishing the report when you called. (Past Continuous)', es: 'Estaba terminando el informe cuando llamaste.' },
            { en: 'I have finished the report. (Present Perfect)', es: 'He terminado el informe.' },
            { en: 'I have worked here for three years. (Present Perfect with for)', es: 'He trabajado aquí por tres años.' },
          ],
          keywords: ['yesterday', 'already', 'yet', 'since', 'for', 'when', 'while'],
        },
        exercises: [
          {
            id: 'e10-1',
            type: 'fill-blank',
            question: 'I ______ (work) at Menarini ______ 2021.',
            questionEs: 'Usa el tiempo correcto.',
            correctAnswer: 'have worked,since',
            explanation: 'Present Perfect + since + specific year/point in time.',
            explanationEs: 'Presente Perfecto + since + año/punto específico en el tiempo.',
            options: ['worked, since', 'have worked, since', 'have worked, for', 'was working, since'],
          },
          {
            id: 'e10-2',
            type: 'multiple-choice',
            question: 'Which is correct? "I ______ the meeting when the power went out."',
            questionEs: '¿Cuál es correcto?',
            correctAnswer: 'was attending',
            explanation: 'Past Continuous for an action interrupted by another (Past Simple).',
            explanationEs: 'Pasado Continuo para una acción interrumpida por otra (Pasado Simple).',
            options: ['attended', 'was attending', 'have attended', 'am attending'],
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l11-future',
        moduleId: 'grammar-b1',
        title: 'Future Forms',
        titleEs: 'Formas de Futuro',
        description: 'Will, Going to, Present Continuous for future arrangements.',
        descriptionEs: 'Will, Going to, Presente Continuo para planes futuros.',
        level: 'intermediate',
        duration: 12,
        xp: 25,
        content: {
          theory: 'Will: spontaneous decisions, predictions, promises. Going to: planned intentions, predictions with evidence. Present Continuous: fixed arrangements.',
          theoryEs: 'Will: decisiones espontáneas. Going to: intenciones planificadas. Presente Continuo: acuerdos fijos.',
          examples: [
            { en: 'I will send you the file right away. (spontaneous)', es: 'Te enviaré el archivo de inmediato.' },
            { en: 'We are going to launch the new website next month. (planned)', es: 'Vamos a lanzar el nuevo sitio web el mes que viene.' },
            { en: 'I am meeting the web master tomorrow at 3 PM. (fixed arrangement)', es: 'Me reúno con el web master mañana a las 3 PM.' },
          ],
          keywords: ['will', 'going to', 'plan', 'schedule', 'launch', 'meeting'],
        },
        exercises: [
          {
            id: 'e11-1',
            type: 'multiple-choice',
            question: '"Look at those clouds! It ______ rain."',
            questionEs: 'Elige la forma de futuro correcta.',
            correctAnswer: "'s going to",
            explanation: 'Going to for predictions based on visible evidence.',
            explanationEs: 'Going to para predicciones basadas en evidencia visible.',
            options: ['will', "'s going to", 'is raining', 'goes to'],
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l12-conditionals',
        moduleId: 'grammar-b1',
        title: 'Conditionals (1st & 2nd)',
        titleEs: 'Condicionales (1º y 2º)',
        description: 'Real and hypothetical situations.',
        descriptionEs: 'Situaciones reales e hipotéticas.',
        level: 'intermediate',
        duration: 15,
        xp: 30,
        content: {
          theory: 'First Conditional: If + Present Simple, will + verb (real possibilities). Second Conditional: If + Past Simple, would + verb (hypothetical/unreal).',
          theoryEs: 'Primer Condicional: situaciones reales posibles. Segundo Condicional: situaciones hipotéticas.',
          examples: [
            { en: 'If we optimize the SEO, we will get more traffic. (1st - real)', es: 'Si optimizamos el SEO, obtendremos más tráfico.' },
            { en: 'If I had more budget, I would hire another designer. (2nd - hypothetical)', es: 'Si tuviera más presupuesto, contrataría a otro diseñador.' },
          ],
          keywords: ['if', 'would', 'will', 'hypothetical', 'possible'],
        },
        exercises: [
          {
            id: 'e12-1',
            type: 'fill-blank',
            question: 'If I ______ (be) the manager, I ______ (implement) a new content strategy.',
            questionEs: 'Usa el Segundo Condicional.',
            correctAnswer: 'were,would implement',
            explanation: 'Second Conditional: If + Past Simple, would + verb. Note: "were" for all persons.',
            explanationEs: 'Segundo Condicional: If + Pasado Simple, would + verbo. "Were" para todas las personas.',
            options: ['am, will implement', 'were, would implement', 'was, would implement', 'were, will implement'],
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l13-passive',
        moduleId: 'grammar-b1',
        title: 'Passive Voice',
        titleEs: 'Voz Pasiva',
        description: 'When and how to use the passive voice in professional writing.',
        descriptionEs: 'Cuándo y cómo usar la voz pasiva en escritura profesional.',
        level: 'intermediate',
        duration: 12,
        xp: 25,
        content: {
          theory: 'Passive voice: subject + be + past participle. Used when the action is more important than who did it. Common in formal/professional writing.',
          theoryEs: 'Voz pasiva: sujeto + be + participio pasado. Se usa cuando la acción es más importante que quién la hizo.',
          examples: [
            { en: 'The content was approved by the marketing director. (passive)', es: 'El contenido fue aprobado por el director de marketing.' },
            { en: 'The website has been updated. (present perfect passive)', es: 'El sitio web ha sido actualizado.' },
            { en: 'The report will be published next week. (future passive)', es: 'El informe será publicado la semana que viene.' },
          ],
          keywords: ['was', 'been', 'be', 'by', 'approved', 'published', 'updated'],
        },
        exercises: [
          {
            id: 'e13-1',
            type: 'multiple-choice',
            question: 'Change to passive: "The team published the article."',
            questionEs: 'Cambia a pasiva.',
            correctAnswer: 'The article was published by the team.',
            explanation: 'Object becomes subject + was/were + past participle.',
            explanationEs: 'El objeto se convierte en sujeto + was/were + participio pasado.',
            options: [
              'The article published by the team.',
              'The article was published by the team.',
              'The article is published the team.',
              'The article has published by the team.',
            ],
          },
        ],
        completed: false,
        progress: 0,
      },
    ],
  },
  {
    id: 'writing-exam',
    title: 'Writing for the Exam',
    titleEs: 'Escritura para el Examen',
    description: 'Email writing, article composition, and exam strategies.',
    descriptionEs: 'Escritura de emails, composición de artículos y estrategias de examen.',
    icon: 'PenLine',
    color: '#7C3AED',
    lessons: [
      {
        id: 'l14-email',
        moduleId: 'writing-exam',
        title: 'Writing Professional Emails',
        titleEs: 'Escribir Emails Profesionales',
        description: 'Structure, formal language, and common phrases for workplace emails.',
        descriptionEs: 'Estructura, lenguaje formal y frases comunes para emails de trabajo.',
        level: 'intermediate',
        duration: 15,
        xp: 30,
        content: {
          theory: 'Professional emails follow a clear structure: Subject line, Greeting, Opening, Body, Closing, Signature. Use formal language and clear paragraphs.',
          theoryEs: 'Los emails profesionales siguen una estructura clara: Asunto, Saludo, Apertura, Cuerpo, Cierre, Firma.',
          examples: [
            { en: 'Subject: Content Strategy Meeting - May 20th', es: 'Asunto: Reunión de Estrategia de Contenido - 20 de mayo' },
            { en: 'Dear Team, I am writing to inform you about the upcoming content review.', es: 'Estimado equipo, les escribo para informarles sobre la próxima revisión de contenido.' },
            { en: 'Please let me know if you have any questions or concerns.', es: 'Por favor avísenme si tienen alguna pregunta o inquietud.' },
            { en: 'Best regards, Rebeca | Content Communication Manager', es: 'Saludos cordiales, Rebeca | Jefa de Comunicación de Contenido' },
          ],
          keywords: ['Subject', 'Dear', 'I am writing to', 'Please', 'Best regards', 'Yours sincerely'],
        },
        exercises: [
          {
            id: 'e14-1',
            type: 'multiple-choice',
            question: 'Which opening is most appropriate for a formal email to your team?',
            questionEs: '¿Qué apertura es más apropiada para un email formal a tu equipo?',
            correctAnswer: 'Dear Team,',
            explanation: '"Dear Team," is professional yet appropriate for colleagues you work with regularly.',
            explanationEs: '"Dear Team," es profesional pero apropiado para colegas con los que trabajas regularmente.',
            options: ['Hey guys,', 'Dear Team,', 'To whom it may concern,', 'Hi everybody,'],
          },
          {
            id: 'e14-2',
            type: 'fill-blank',
            question: '______ let me know if you need any further information.',
            questionEs: 'Completa con la frase formal correcta.',
            correctAnswer: 'Please',
            explanation: '"Please" is the standard polite way to make requests in professional emails.',
            explanationEs: '"Please" es la forma estándar educada de hacer solicitudes en emails profesionales.',
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l15-article',
        moduleId: 'writing-exam',
        title: 'Writing an Article',
        titleEs: 'Escribir un Artículo',
        description: 'Structure and language for writing articles and reports.',
        descriptionEs: 'Estructura y lenguaje para escribir artículos e informes.',
        level: 'advanced',
        duration: 18,
        xp: 35,
        content: {
          theory: 'Articles need a catchy title, clear introduction, well-organized body paragraphs with topic sentences, and a strong conclusion. Use linking words: firstly, moreover, however, in conclusion.',
          theoryEs: 'Los artículos necesitan un título atractivo, introducción clara, párrafos bien organizados y conclusión fuerte.',
          examples: [
            { en: 'Title: The Future of Digital Marketing in Healthcare', es: 'Título: El Futuro del Marketing Digital en Salud' },
            { en: 'Introduction: Digital marketing has transformed how pharmaceutical companies connect with patients.', es: 'Introducción: El marketing digital ha transformado cómo las farmacéuticas se conectan con pacientes.' },
            { en: 'Moreover, social media platforms offer new opportunities for patient education.', es: 'Además, las redes sociales ofrecen nuevas oportunidades para la educación de pacientes.' },
            { en: 'In conclusion, a well-planned digital strategy is essential for success.', es: 'En conclusión, una estrategia digital bien planificada es esencial para el éxito.' },
          ],
          keywords: ['Title', 'Introduction', 'Moreover', 'However', 'In conclusion', 'Furthermore'],
        },
        exercises: [
          {
            id: 'e15-1',
            type: 'order-words',
            question: 'Order these linking words by their function: contrast, addition, conclusion',
            questionEs: 'Ordena estas palabras de enlace por su función.',
            correctAnswer: 'Moreover, However, In conclusion.',
            explanation: 'Moreover = addition, However = contrast, In conclusion = summary.',
            explanationEs: 'Moreover = adición, However = contraste, In conclusion = resumen.',
            options: ['However,', 'Moreover,', 'In', 'conclusion.'],
          },
        ],
        completed: false,
        progress: 0,
      },
      {
        id: 'l16-exam-tips',
        moduleId: 'writing-exam',
        title: 'Exam Strategies',
        titleEs: 'Estrategias para el Examen',
        description: 'Time management, planning, and review techniques.',
        descriptionEs: 'Gestión del tiempo, planificación y técnicas de revisión.',
        level: 'intermediate',
        duration: 10,
        xp: 20,
        content: {
          theory: 'Plan (5 min): read the question carefully, brainstorm ideas, write an outline. Write (20 min): follow your plan, use varied vocabulary and grammar. Review (5 min): check spelling, grammar, and word count.',
          theoryEs: 'Planifica (5 min): lee la pregunta, haz un esquema. Escribe (20 min): sigue tu plan. Revisa (5 min): verifica ortografía y gramática.',
          examples: [
            { en: 'Always read the question twice before starting.', es: 'Siempre lee la pregunta dos veces antes de empezar.' },
            { en: 'Leave 5 minutes at the end to review your work.', es: 'Deja 5 minutos al final para revisar tu trabajo.' },
            { en: 'Use a variety of sentence structures to show your range.', es: 'Usa variedad de estructuras de oración para mostrar tu nivel.' },
          ],
          keywords: ['plan', 'outline', 'review', 'brainstorm', 'word count', 'time management'],
        },
        exercises: [
          {
            id: 'e16-1',
            type: 'true-false',
            question: 'You should spend the most time planning and the least time writing.',
            questionEs: 'Debes pasar más tiempo planificando y menos escribiendo.',
            correctAnswer: 'False',
            explanation: 'Spend 5 min planning, 20 min writing, 5 min reviewing.',
            explanationEs: '5 min planificando, 20 min escribiendo, 5 min revisando.',
            options: ['True', 'False'],
          },
        ],
        completed: false,
        progress: 0,
      },
    ],
  },
];

// Vocabulary data
export interface VocabItem {
  id: string;
  en: string;
  es: string;
  category: string;
  example: string;
  pronunciation?: string;
}

export const vocabCategories = [
  { id: 'seo', name: 'SEO & Digital', nameEs: 'SEO y Digital' },
  { id: 'pharma', name: 'Pharmaceutical', nameEs: 'Farmacéutico' },
  { id: 'workplace', name: 'Workplace', nameEs: 'Trabajo' },
  { id: 'leadership', name: 'Leadership', nameEs: 'Liderazgo' },
  { id: 'exam', name: 'Exam Language', nameEs: 'Lenguaje de Examen' },
];

export const vocabulary: VocabItem[] = [
  // SEO & Digital
  { id: 'v1', en: 'Search Engine Optimization', es: 'Optimización para motores de búsqueda', category: 'seo', example: 'SEO helps our website rank higher on Google.' },
  { id: 'v2', en: 'Keyword', es: 'Palabra clave', category: 'seo', example: 'We need to research the best keywords for our content.' },
  { id: 'v3', en: 'Backlink', es: 'Enlace entrante', category: 'seo', example: 'Quality backlinks improve our domain authority.' },
  { id: 'v4', en: 'Bounce Rate', es: 'Tasa de rebote', category: 'seo', example: 'A high bounce rate means visitors leave quickly.' },
  { id: 'v5', en: 'Conversion Rate', es: 'Tasa de conversión', category: 'seo', example: 'Our goal is to increase the conversion rate.' },
  { id: 'v6', en: 'Landing Page', es: 'Página de destino', category: 'seo', example: 'The landing page must have a clear call to action.' },
  { id: 'v7', en: 'Organic Traffic', es: 'Tráfico orgánico', category: 'seo', example: 'Organic traffic increased by 35% this quarter.' },
  { id: 'v8', en: 'Meta Description', es: 'Meta descripción', category: 'seo', example: 'The meta description appears in search results.' },
  { id: 'v9', en: 'Content Calendar', es: 'Calendario de contenido', category: 'seo', example: 'We plan our posts using a content calendar.' },
  { id: 'v10', en: 'Analytics', es: 'Analítica', category: 'seo', example: 'We use Google Analytics to track performance.' },
  { id: 'v11', en: 'Call to Action', es: 'Llamada a la acción', category: 'seo', example: 'Every email needs a clear call to action.' },
  { id: 'v12', en: 'Engagement', es: 'Interacción / Compromiso', category: 'seo', example: 'Our social media engagement rate is 4.5%.' },
  // Pharmaceutical
  { id: 'v13', en: 'Therapeutic Area', es: 'Área terapéutica', category: 'pharma', example: 'Oncology is a key therapeutic area for Menarini.' },
  { id: 'v14', en: 'Clinical Trial', es: 'Ensayo clínico', category: 'pharma', example: 'The clinical trial showed positive results.' },
  { id: 'v15', en: 'Patient', es: 'Paciente', category: 'pharma', example: 'Patient safety is our top priority.' },
  { id: 'v16', en: 'Treatment', es: 'Tratamiento', category: 'pharma', example: 'This treatment is effective for chronic pain.' },
  { id: 'v17', en: 'Prescription', es: 'Receta médica', category: 'pharma', example: 'This medicine requires a doctor\'s prescription.' },
  { id: 'v18', en: 'Active Ingredient', es: 'Principio activo', category: 'pharma', example: 'The active ingredient reduces inflammation.' },
  { id: 'v19', en: 'Side Effect', es: 'Efecto secundario', category: 'pharma', example: 'Common side effects include mild headaches.' },
  { id: 'v20', en: 'Regulatory Approval', es: 'Aprobación regulatoria', category: 'pharma', example: 'The drug received regulatory approval in Europe.' },
  // Workplace
  { id: 'v21', en: 'Deadline', es: 'Fecha límite', category: 'workplace', example: 'We must meet the deadline for the campaign.' },
  { id: 'v22', en: 'Meeting', es: 'Reunión', category: 'workplace', example: 'Let\'s schedule a meeting to discuss the strategy.' },
  { id: 'v23', en: 'Feedback', es: 'Retroalimentación', category: 'workplace', example: 'I gave constructive feedback to the designer.' },
  { id: 'v24', en: 'Report', es: 'Informe', category: 'workplace', example: 'Please submit the monthly report by Friday.' },
  { id: 'v25', en: 'Agenda', es: 'Orden del día', category: 'workplace', example: 'Let\'s review the agenda before the meeting.' },
  { id: 'v26', en: 'Follow up', es: 'Dar seguimiento', category: 'workplace', example: 'I will follow up on this task next week.' },
  // Leadership
  { id: 'v27', en: 'Team Leader', es: 'Líder de equipo', category: 'leadership', example: 'As team leader, I coordinate all content projects.' },
  { id: 'v28', en: 'Delegate', es: 'Delegar', category: 'leadership', example: 'A good manager knows how to delegate tasks.' },
  { id: 'v29', en: 'Collaborate', es: 'Colaborar', category: 'leadership', example: 'We collaborate with the web master on updates.' },
  { id: 'v30', en: 'Motivate', es: 'Motivar', category: 'leadership', example: 'It\'s important to motivate your team members.' },
  { id: 'v31', en: 'Performance', es: 'Rendimiento', category: 'leadership', example: 'We review team performance every quarter.' },
  { id: 'v32', en: 'Goal', es: 'Objetivo / Meta', category: 'leadership', example: 'Our goal is to increase engagement by 20%.' },
  // Exam Language
  { id: 'v33', en: 'Furthermore', es: 'Además', category: 'exam', example: 'Furthermore, the results exceeded expectations.' },
  { id: 'v34', en: 'However', es: 'Sin embargo', category: 'exam', example: 'However, there are some challenges to consider.' },
  { id: 'v35', en: 'In conclusion', es: 'En conclusión', category: 'exam', example: 'In conclusion, the strategy was successful.' },
  { id: 'v36', en: 'On the other hand', es: 'Por otro lado', category: 'exam', example: 'On the other hand, costs have increased.' },
  { id: 'v37', en: 'Therefore', es: 'Por lo tanto', category: 'exam', example: 'Therefore, we recommend a new approach.' },
  { id: 'v38', en: 'In addition', es: 'Además', category: 'exam', example: 'In addition, the team worked efficiently.' },
  { id: 'v39', en: 'Although', es: 'Aunque', category: 'exam', example: 'Although the budget was limited, we succeeded.' },
  { id: 'v40', en: 'Despite', es: 'A pesar de', category: 'exam', example: 'Despite the challenges, the project was completed.' },
];

// Writing prompts
export interface WritingPrompt {
  id: string;
  title: string;
  titleEs: string;
  type: 'email' | 'article' | 'essay';
  prompt: string;
  promptEs: string;
  wordCount: string;
  keywords: string[];
  modelAnswer?: string;
}

export const writingPrompts: WritingPrompt[] = [
  {
    id: 'w1',
    title: 'Team Introduction Email',
    titleEs: 'Email de Presentación al Equipo',
    type: 'email',
    prompt: 'Write an email to your team (web master, designer, and 3 content creators) introducing yourself as the new Content Communication Manager at Menarini. Explain your role, your goals for the team, and invite them to a kick-off meeting.',
    promptEs: 'Escribe un email a tu equipo presentándote como la nueva Jefa de Comunicación de Contenido en Menarini.',
    wordCount: '120-150 words',
    keywords: ['introduce', 'role', 'team', 'goals', 'meeting'],
    modelAnswer: 'Subject: Introduction - Your New Content Communication Manager\n\nDear Team,\n\nI am writing to introduce myself as your new Content Communication Manager at Menarini. My name is Rebeca, and I am excited to be joining this talented team.\n\nIn my role, I will be responsible for overseeing our content strategy across all digital platforms. I will work closely with each of you to ensure our content supports Menarini\'s mission in healthcare. My goal is to build a collaborative environment where everyone\'s ideas are valued.\n\nI would like to invite you all to a kick-off meeting next Tuesday at 10 AM, where we can discuss our upcoming projects and set our priorities for the quarter.\n\nPlease feel free to reach out if you have any questions before then.\n\nBest regards,\nRebeca',
  },
  {
    id: 'w2',
    title: 'SEO Strategy Article',
    titleEs: 'Artículo sobre Estrategia SEO',
    type: 'article',
    prompt: 'Write an article about the importance of SEO in the pharmaceutical industry. Discuss why patients search for health information online and how pharmaceutical companies can provide reliable content.',
    promptEs: 'Escribe un artículo sobre la importancia del SEO en la industria farmacéutica.',
    wordCount: '150-180 words',
    keywords: ['SEO', 'pharmaceutical', 'patients', 'online', 'information', 'trust'],
  },
  {
    id: 'w3',
    title: 'Content Manager Role Essay',
    titleEs: 'Ensayo sobre el Rol de Content Manager',
    type: 'essay',
    prompt: 'Write an essay: "The role of a Content Communication Manager in a pharmaceutical company." Discuss responsibilities, skills needed, and the importance of content in healthcare communication.',
    promptEs: 'Escribe un ensayo sobre el rol de un Content Manager en una empresa farmacéutica.',
    wordCount: '180-200 words',
    keywords: ['content manager', 'responsibilities', 'skills', 'healthcare', 'communication'],
  },
  {
    id: 'w4',
    title: 'Campaign Update Email',
    titleEs: 'Email de Actualización de Campaña',
    type: 'email',
    prompt: 'Write an email to the marketing director updating them on the progress of the current digital campaign. Include metrics, what is working well, and one area that needs improvement.',
    promptEs: 'Escribe un email al director de marketing actualizando sobre el progreso de la campaña digital actual.',
    wordCount: '120-150 words',
    keywords: ['campaign', 'metrics', 'progress', 'improvement', 'results'],
  },
  {
    id: 'w5',
    title: 'Meeting Summary',
    titleEs: 'Resumen de Reunión',
    type: 'email',
    prompt: 'Write a summary of a team meeting about the Q3 content strategy. Include: attendees, main decisions, action items with owners and deadlines.',
    promptEs: 'Escribe un resumen de una reunión de equipo sobre la estrategia de contenido del Q3.',
    wordCount: '130-160 words',
    keywords: ['meeting', 'summary', 'decisions', 'action items', 'deadline'],
  },
];

// User progress (could be stored in localStorage)
export interface UserProgress {
  totalXP: number;
  streakDays: number;
  lessonsCompleted: string[];
  exercisesCompleted: string[];
  vocabularyLearned: string[];
  lastStudyDate: string;
  dailyGoal: number;
  dailyProgress: number;
}

export const defaultProgress: UserProgress = {
  totalXP: 0,
  streakDays: 7,
  lessonsCompleted: [],
  exercisesCompleted: [],
  vocabularyLearned: [],
  lastStudyDate: new Date().toISOString().split('T')[0],
  dailyGoal: 30,
  dailyProgress: 15,
};
