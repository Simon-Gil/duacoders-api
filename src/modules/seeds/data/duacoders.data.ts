import { CreateDuacoderDTO } from "src/modules/duacoders/dto/create-duacoder.dto";

// Datos de prueba para duacoders
export const duacoders: CreateDuacoderDTO[] = [
    {
        nif: '12345678A',
        name: 'Pablo García',
        bio: 'Pablo es un líder apasionado por la tecnología, con más de 10 años de experiencia dirigiendo equipos de desarrollo en proyectos de software. Siempre está buscando innovaciones que mejoren la eficiencia y el rendimiento.',
        photoLink: '',
        withOnion: true,
        skills: ['Docker', 'MariaDB', 'NodeJS'],
        bDate: '1995-10-10',
        positionId: 'Director',
        departmentId: 'Software'
    },
    {
        nif: '23456789B',
        name: 'Ana López',
        bio: 'Ana es una coordinadora comprometida con la entrega de proyectos de software de calidad. Su experiencia incluye el manejo de equipos ágiles y el uso de tecnologías modernas para ofrecer soluciones efectivas.',
        photoLink: '',
        withOnion: true,
        skills: ['JavaScript', 'NodeJS', 'React', 'Docker'],
        bDate: '1990-05-23',
        positionId: 'Coordinador',
        departmentId: 'Software'
    },
    {
        nif: '34567890C',
        name: 'Luis Martínez',
        bio: 'Luis es un desarrollador apasionado por las tecnologías de backend. Se especializa en Java y Spring Boot, y le encanta trabajar en proyectos que mejoren el rendimiento y escalabilidad de los sistemas.',
        photoLink: '',
        withOnion: true,
        skills: ['Java', 'Spring Boot', 'SQL'],
        bDate: '1992-08-15',
        positionId: 'Técnico',
        departmentId: 'Software'
    },
    {
        nif: '45678901D',
        name: 'Marta Sánchez',
        bio: 'Marta es una entusiasta programadora con un enfoque en Python y Django. Le gusta abordar problemas complejos con soluciones simples y escalables, siempre aprendiendo nuevas tecnologías y técnicas.',
        photoLink: '',
        withOnion: false,
        skills: ['Python', 'Django', 'AWS'],
        bDate: '1993-11-02',
        positionId: 'Técnico',
        departmentId: 'Software'
    },
    {
        nif: '56789012E',
        name: 'Carlos Pérez',
        bio: 'Carlos es un experimentado director comercial con un enfoque en estrategias de ventas y crecimiento empresarial. Su enfoque en la innovación y la optimización de procesos ha ayudado a numerosas empresas a alcanzar sus metas.',
        photoLink: '',
        withOnion: false,
        skills: ['PHP', 'Laravel', 'MySQL'],
        bDate: '1988-03-30',
        positionId: 'Director',
        departmentId: 'Comercial'
    },
    {
        nif: '67890123F',
        name: 'Laura González',
        bio: 'Laura es una coordinadora comercial con experiencia en marketing digital y gestión de equipos. Su habilidad para gestionar proyectos y optimizar procesos comerciales la convierte en un pilar clave dentro de su equipo.',
        photoLink: '',
        withOnion: true,
        skills: ['Marketing', 'SEO', 'CRM'],
        bDate: '1994-06-17',
        positionId: 'Coordinador',
        departmentId: 'Comercial'
    },
    {
        nif: '78901234G',
        name: 'Juan Ruiz',
        bio: 'Juan es un técnico comercial con gran habilidad en ventas y atención al cliente. Su enfoque proactivo y orientado a resultados ha sido clave para alcanzar los objetivos de ventas en cada empresa en la que ha trabajado.',
        photoLink: '',
        withOnion: false,
        skills: ['Ventas', 'CRM', 'Negociación'],
        bDate: '1991-09-09',
        positionId: 'Técnico',
        departmentId: 'Comercial'
    },
    {
        nif: '89012345H',
        name: 'Pedro Fernández',
        bio: 'Pedro es un técnico comercial enfocado en la mejora de relaciones con clientes y el cierre de ventas. Su conocimiento de la negociación y su empatía lo hacen un experto en la creación de relaciones duraderas con los clientes.',
        photoLink: '',
        withOnion: false,
        skills: ['Ventas', 'Gestión de clientes', 'Técnicas de negociación'],
        bDate: '1990-01-25',
        positionId: 'Técnico',
        departmentId: 'Comercial'
    },
];
