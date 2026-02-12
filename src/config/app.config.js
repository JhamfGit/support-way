/**
 * Configuración de ejemplo para Support Way
 * Este archivo muestra cómo se podría configurar la aplicación en el futuro
 */

export const appConfig = {
    // Información de la aplicación
    app: {
        name: 'Support Way',
        version: '1.0.0',
        description: 'Sistema de Gestión de Tiempos de Soporte Técnico',
    },

    // Configuración de tiempos (en segundos)
    timeThresholds: {
        travel: {
            normal: 1800,   // 30 minutos - Verde
            warning: 2700,  // 45 minutos - Amarillo
            danger: 3600,   // 60 minutos - Rojo
        },
        work: {
            normal: 3600,   // 60 minutos - Verde
            warning: 5400,  // 90 minutos - Amarillo
            danger: 7200,   // 120 minutos - Rojo
        },
    },

    // Configuración de notificaciones
    notifications: {
        enabled: true,
        showOnTimeExceeded: true,
        soundEnabled: false,
        vibrationEnabled: true,
    },

    // Configuración de datos de demostración
    demo: {
        enabled: true,
        supportCount: 12,
        dateRangeDays: 30,
    },

    // Configuración de almacenamiento
    storage: {
        autoSave: true,
        autoSaveInterval: 30000, // 30 segundos
        maxSupports: 1000,
        clearOldDataAfterDays: 90,
    },

    // Configuración de UI
    ui: {
        theme: 'light', // 'light' | 'dark' | 'auto'
        language: 'es', // 'es' | 'en'
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h', // '24h' | '12h'
        animationsEnabled: true,
    },

    // Configuración de exportación
    export: {
        defaultFormat: 'pdf', // 'pdf' | 'excel' | 'csv' | 'json'
        includeCharts: true,
        includeTimeline: true,
    },

    // Configuración de filtros
    filters: {
        defaultDateRange: 'month', // 'today' | 'week' | 'month' | 'year' | 'all'
        rememberLastFilters: true,
    },

    // Tipos de soporte disponibles
    supportTypes: [
        'Instalación',
        'Mantenimiento',
        'Reparación',
        'Consultoría',
        'Emergencia',
        'Actualización',
        'Diagnóstico',
        'Capacitación',
    ],

    // Medios de transporte disponibles
    transportOptions: [
        { value: 'moto', label: 'Moto', icon: '🏍️', avgSpeed: 40 },
        { value: 'carro', label: 'Carro', icon: '🚗', avgSpeed: 50 },
        { value: 'publico', label: 'Transporte Público', icon: '🚌', avgSpeed: 30 },
        { value: 'caminando', label: 'Caminando', icon: '🚶', avgSpeed: 5 },
    ],

    // Configuración de API (para futuras versiones)
    api: {
        baseUrl: 'http://localhost:3000/api',
        timeout: 10000,
        retryAttempts: 3,
        endpoints: {
            supports: '/supports',
            technicians: '/technicians',
            clients: '/clients',
            reports: '/reports',
        },
    },

    // Configuración de geolocalización (para futuras versiones)
    geolocation: {
        enabled: false,
        trackRoute: false,
        updateInterval: 60000, // 1 minuto
    },

    // Configuración de reportes
    reports: {
        autoGenerate: true,
        includePhotos: false,
        requireSignature: false,
        emailOnComplete: false,
    },
};

export default appConfig;
