/**
 * Constantes de la aplicación Support Way
 */

// Estados del soporte
export const SUPPORT_STATUS = {
    ASSIGNED: 'assigned',
    TRAVELING_TO_SITE: 'traveling_to_site',
    ON_SITE: 'on_site',
    RETURNING: 'returning',
    COMPLETED: 'completed',
};

// Tipos de soporte
export const SUPPORT_TYPES = [
    'Instalación',
    'Mantenimiento',
    'Reparación',
    'Consultoría',
    'Emergencia',
    'Actualización',
    'Diagnóstico',
    'Capacitación',
];

// Medios de transporte
export const TRANSPORT_OPTIONS = [
    { value: 'moto', label: 'Moto', icon: '🏍️' },
    { value: 'carro', label: 'Carro', icon: '🚗' },
    { value: 'publico', label: 'Transporte Público', icon: '🚌' },
    { value: 'caminando', label: 'Caminando', icon: '🚶' },
];

// Información de estados
export const STATUS_INFO = {
    [SUPPORT_STATUS.ASSIGNED]: {
        icon: '📋',
        label: 'Asignado',
        color: 'info',
        description: 'Soporte asignado, listo para salir',
    },
    [SUPPORT_STATUS.TRAVELING_TO_SITE]: {
        icon: '🚗',
        label: 'En camino al sitio',
        color: 'warning',
        description: 'Técnico viajando hacia el cliente',
    },
    [SUPPORT_STATUS.ON_SITE]: {
        icon: '🟢',
        label: 'En sitio',
        color: 'success',
        description: 'Técnico trabajando en el sitio',
    },
    [SUPPORT_STATUS.RETURNING]: {
        icon: '🚙',
        label: 'Regresando a oficina',
        color: 'warning',
        description: 'Soporte finalizado, regresando',
    },
    [SUPPORT_STATUS.COMPLETED]: {
        icon: '✅',
        label: 'Completado',
        color: 'success',
        description: 'Soporte completado exitosamente',
    },
};

// Eventos del timeline
export const TIMELINE_EVENTS = [
    {
        key: 'assigned',
        icon: '📌',
        label: 'Asignación',
    },
    {
        key: 'departed',
        icon: '🚗',
        label: 'Salida hacia soporte',
    },
    {
        key: 'arrived',
        icon: '📍',
        label: 'Llegada al sitio',
    },
    {
        key: 'finished',
        icon: '✅',
        label: 'Finalización del soporte',
    },
    {
        key: 'returned',
        icon: '🏢',
        label: 'Llegada a oficina',
    },
];

// Umbrales de tiempo (en segundos)
export const TIME_THRESHOLDS = {
    TRAVEL_NORMAL: 1800, // 30 minutos
    TRAVEL_WARNING: 2700, // 45 minutos
    TRAVEL_DANGER: 3600, // 60 minutos
    WORK_NORMAL: 3600, // 60 minutos
    WORK_WARNING: 5400, // 90 minutos
    WORK_DANGER: 7200, // 120 minutos
};

// Claves de localStorage
export const STORAGE_KEYS = {
    SUPPORTS: 'support_way_supports',
    SETTINGS: 'support_way_settings',
    USER: 'support_way_user',
};

// Configuración por defecto
export const DEFAULT_SETTINGS = {
    theme: 'light',
    notifications: true,
    autoSave: true,
    showDemoData: true,
};

// Nombres de técnicos para demo
export const DEMO_TECHNICIANS = [
    'Carlos Méndez',
    'Ana García',
    'Luis Rodríguez',
    'María Torres',
    'Pedro Sánchez',
    'Laura Martínez',
    'Jorge Ramírez',
    'Sofia López',
];

// Clientes para demo
export const DEMO_CLIENTS = [
    'TechCorp',
    'InnovaLab',
    'DataSystems',
    'CloudNet',
    'SmartSolutions',
    'DigiTech',
    'FutureSoft',
    'CyberSpace',
    'NetWorks Inc',
    'InfoTech Solutions',
];

// Mensajes de la aplicación
export const MESSAGES = {
    SUPPORT_STARTED: '¡Soporte iniciado exitosamente!',
    SUPPORT_COMPLETED: '¡Soporte completado! Reporte generado.',
    NO_SUPPORTS_FOUND: 'No se encontraron soportes',
    FILTER_APPLIED: 'Filtros aplicados',
    ERROR_GENERIC: 'Ha ocurrido un error. Por favor, intenta de nuevo.',
};

export default {
    SUPPORT_STATUS,
    SUPPORT_TYPES,
    TRANSPORT_OPTIONS,
    STATUS_INFO,
    TIMELINE_EVENTS,
    TIME_THRESHOLDS,
    STORAGE_KEYS,
    DEFAULT_SETTINGS,
    DEMO_TECHNICIANS,
    DEMO_CLIENTS,
    MESSAGES,
};
