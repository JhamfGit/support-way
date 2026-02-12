/**
 * Formatea segundos a formato legible (HH:MM:SS o MM:SS)
 * @param {number} seconds - Segundos a formatear
 * @returns {string} Tiempo formateado
 */
export const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Formatea segundos a formato corto (Xh Ym o Ym Zs)
 * @param {number} seconds - Segundos a formatear
 * @returns {string} Tiempo formateado
 */
export const formatTimeShort = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
        return `${hrs}h ${mins}m`;
    } else if (mins > 0) {
        return `${mins}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
};

/**
 * Calcula la diferencia de tiempo entre dos timestamps
 * @param {string} start - Timestamp de inicio
 * @param {string} end - Timestamp de fin
 * @returns {number} Diferencia en segundos
 */
export const calculateTimeDiff = (start, end) => {
    if (!start || !end) return 0;
    return Math.floor((new Date(end) - new Date(start)) / 1000);
};

/**
 * Obtiene el icono del medio de transporte
 * @param {string} transport - Tipo de transporte
 * @returns {string} Emoji del transporte
 */
export const getTransportIcon = (transport) => {
    const icons = {
        moto: '🏍️',
        carro: '🚗',
        publico: '🚌',
        caminando: '🚶',
    };
    return icons[transport] || '🚗';
};

/**
 * Obtiene la etiqueta del medio de transporte
 * @param {string} transport - Tipo de transporte
 * @returns {string} Nombre del transporte
 */
export const getTransportLabel = (transport) => {
    const labels = {
        moto: 'Moto',
        carro: 'Carro',
        publico: 'Transporte Público',
        caminando: 'Caminando',
    };
    return labels[transport] || transport;
};

/**
 * Obtiene el color del estado
 * @param {string} status - Estado del soporte
 * @returns {string} Nombre de la clase de color
 */
export const getStatusColor = (status) => {
    const colors = {
        assigned: 'info',
        traveling_to_site: 'warning',
        on_site: 'success',
        returning: 'warning',
        completed: 'success',
    };
    return colors[status] || 'info';
};

/**
 * Genera datos de demostración para soportes
 * @param {number} count - Cantidad de soportes a generar
 * @returns {Array} Array de soportes de demostración
 */
export const generateDemoSupports = (count = 12) => {
    const technicians = ['Carlos Méndez', 'Ana García', 'Luis Rodríguez', 'María Torres', 'Pedro Sánchez'];
    const clients = ['TechCorp', 'InnovaLab', 'DataSystems', 'CloudNet', 'SmartSolutions', 'DigiTech', 'FutureSoft'];
    const types = ['Instalación', 'Mantenimiento', 'Reparación', 'Consultoría', 'Emergencia', 'Actualización'];
    const transports = ['moto', 'carro', 'publico', 'caminando'];

    return Array.from({ length: count }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        date.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60), 0, 0);

        const travelToSite = 900 + Math.floor(Math.random() * 1800); // 15-45 min
        const timeOnSite = 1800 + Math.floor(Math.random() * 5400); // 30-120 min
        const travelReturn = 900 + Math.floor(Math.random() * 1800); // 15-45 min

        const assignedTime = date.toISOString();
        const departedTime = new Date(date.getTime() + 5 * 60000).toISOString();
        const arrivedTime = new Date(date.getTime() + (5 * 60000) + (travelToSite * 1000)).toISOString();
        const finishedTime = new Date(date.getTime() + (5 * 60000) + (travelToSite * 1000) + (timeOnSite * 1000)).toISOString();
        const returnedTime = new Date(date.getTime() + (5 * 60000) + (travelToSite * 1000) + (timeOnSite * 1000) + (travelReturn * 1000)).toISOString();

        return {
            id: i + 1,
            technician: technicians[Math.floor(Math.random() * technicians.length)],
            client: clients[Math.floor(Math.random() * clients.length)],
            supportType: types[Math.floor(Math.random() * types.length)],
            transport: transports[Math.floor(Math.random() * transports.length)],
            scheduledTime: `${8 + Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            timestamps: {
                assigned: assignedTime,
                departed: departedTime,
                arrived: arrivedTime,
                finished: finishedTime,
                returned: returnedTime,
            },
            times: {
                travelToSite,
                timeOnSite,
                travelReturn,
                totalTime: travelToSite + timeOnSite + travelReturn,
            },
            status: 'completed',
        };
    });
};

/**
 * Exporta datos a JSON para descarga
 * @param {Array} data - Datos a exportar
 * @param {string} filename - Nombre del archivo
 */
export const exportToJSON = (data, filename = 'soportes.json') => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = filename;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

/**
 * Guarda datos en localStorage
 * @param {string} key - Clave de almacenamiento
 * @param {any} data - Datos a guardar
 */
export const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

/**
 * Carga datos desde localStorage
 * @param {string} key - Clave de almacenamiento
 * @returns {any} Datos cargados o null
 */
export const loadFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
};
