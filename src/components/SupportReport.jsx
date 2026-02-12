import './SupportReport.css';

const SupportReport = ({ support, onNewSupport }) => {
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hrs > 0) {
            return `${hrs}h ${mins}m ${secs}s`;
        } else if (mins > 0) {
            return `${mins}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    };

    const getTransportIcon = (transport) => {
        const icons = {
            moto: '🏍️',
            carro: '🚗',
            publico: '🚌',
            caminando: '🚶',
        };
        return icons[transport] || '🚗';
    };

    const getTransportLabel = (transport) => {
        const labels = {
            moto: 'Moto',
            carro: 'Carro',
            publico: 'Transporte Público',
            caminando: 'Caminando',
        };
        return labels[transport] || transport;
    };

    const times = support.times || {};
    const maxTime = Math.max(
        times.travelToSite || 0,
        times.timeOnSite || 0,
        times.travelReturn || 0
    );

    const getBarWidth = (time) => {
        if (maxTime === 0) return '0%';
        return `${(time / maxTime) * 100}%`;
    };

    return (
        <div className="support-report animate-fade-in">
            <div className="report-container">
                {/* Header de éxito */}
                <div className="success-header card">
                    <div className="success-icon">✅</div>
                    <h2>¡Soporte Completado Exitosamente!</h2>
                    <p>El reporte ha sido generado automáticamente</p>
                </div>

                {/* Información del soporte */}
                <div className="report-info card">
                    <h3 className="section-title">📋 Información del Soporte</h3>
                    <div className="info-grid">
                        <div className="info-card">
                            <div className="info-icon">👨‍🔧</div>
                            <div className="info-content">
                                <div className="info-label">Técnico</div>
                                <div className="info-value">{support.technician}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">🏢</div>
                            <div className="info-content">
                                <div className="info-label">Cliente</div>
                                <div className="info-value">{support.client}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">🛠️</div>
                            <div className="info-content">
                                <div className="info-label">Tipo de Soporte</div>
                                <div className="info-value">{support.supportType}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">{getTransportIcon(support.transport)}</div>
                            <div className="info-content">
                                <div className="info-label">Transporte</div>
                                <div className="info-value">{getTransportLabel(support.transport)}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">📅</div>
                            <div className="info-content">
                                <div className="info-label">Fecha</div>
                                <div className="info-value">
                                    {new Date(support.timestamps.assigned).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">⏱️</div>
                            <div className="info-content">
                                <div className="info-label">Duración Total</div>
                                <div className="info-value">{formatTime(times.totalTime)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Métricas de tiempo */}
                <div className="time-metrics card">
                    <h3 className="section-title">⏱️ Desglose de Tiempos</h3>
                    <div className="metrics-grid">
                        <div className="metric-card metric-primary">
                            <div className="metric-icon">🚗</div>
                            <div className="metric-value">{formatTime(times.travelToSite)}</div>
                            <div className="metric-label">Desplazamiento Ida</div>
                        </div>
                        <div className="metric-card metric-success">
                            <div className="metric-icon">🛠️</div>
                            <div className="metric-value">{formatTime(times.timeOnSite)}</div>
                            <div className="metric-label">Tiempo en Sitio</div>
                        </div>
                        <div className="metric-card metric-warning">
                            <div className="metric-icon">🚙</div>
                            <div className="metric-value">{formatTime(times.travelReturn)}</div>
                            <div className="metric-label">Desplazamiento Regreso</div>
                        </div>
                        <div className="metric-card metric-info">
                            <div className="metric-icon">⏰</div>
                            <div className="metric-value">{formatTime(times.totalTime)}</div>
                            <div className="metric-label">Tiempo Total</div>
                        </div>
                    </div>
                </div>

                {/* Gráfico comparativo */}
                <div className="time-chart card">
                    <h3 className="section-title">📊 Comparativa Visual de Tiempos</h3>
                    <div className="chart-container">
                        <div className="chart-row">
                            <div className="chart-label">
                                <span className="chart-icon">🚗</span>
                                Ida
                            </div>
                            <div className="chart-bar-container">
                                <div
                                    className="chart-bar bar-primary"
                                    style={{ width: getBarWidth(times.travelToSite) }}
                                >
                                    <span className="bar-value">{formatTime(times.travelToSite)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart-row">
                            <div className="chart-label">
                                <span className="chart-icon">🛠️</span>
                                En Sitio
                            </div>
                            <div className="chart-bar-container">
                                <div
                                    className="chart-bar bar-success"
                                    style={{ width: getBarWidth(times.timeOnSite) }}
                                >
                                    <span className="bar-value">{formatTime(times.timeOnSite)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart-row">
                            <div className="chart-label">
                                <span className="chart-icon">🚙</span>
                                Regreso
                            </div>
                            <div className="chart-bar-container">
                                <div
                                    className="chart-bar bar-warning"
                                    style={{ width: getBarWidth(times.travelReturn) }}
                                >
                                    <span className="bar-value">{formatTime(times.travelReturn)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline detallado */}
                <div className="detailed-timeline card">
                    <h3 className="section-title">🕐 Registro Detallado de Horarios</h3>
                    <div className="timeline-table">
                        <div className="timeline-row timeline-header">
                            <div className="timeline-cell">Evento</div>
                            <div className="timeline-cell">Hora</div>
                        </div>
                        <div className="timeline-row">
                            <div className="timeline-cell">
                                <span className="event-icon">📌</span>
                                Asignación
                            </div>
                            <div className="timeline-cell">
                                {new Date(support.timestamps.assigned).toLocaleTimeString()}
                            </div>
                        </div>
                        <div className="timeline-row">
                            <div className="timeline-cell">
                                <span className="event-icon">🚗</span>
                                Salida hacia soporte
                            </div>
                            <div className="timeline-cell">
                                {new Date(support.timestamps.departed).toLocaleTimeString()}
                            </div>
                        </div>
                        <div className="timeline-row">
                            <div className="timeline-cell">
                                <span className="event-icon">📍</span>
                                Llegada al sitio
                            </div>
                            <div className="timeline-cell">
                                {new Date(support.timestamps.arrived).toLocaleTimeString()}
                            </div>
                        </div>
                        <div className="timeline-row">
                            <div className="timeline-cell">
                                <span className="event-icon">✅</span>
                                Finalización del soporte
                            </div>
                            <div className="timeline-cell">
                                {new Date(support.timestamps.finished).toLocaleTimeString()}
                            </div>
                        </div>
                        <div className="timeline-row">
                            <div className="timeline-cell">
                                <span className="event-icon">🏢</span>
                                Llegada a oficina
                            </div>
                            <div className="timeline-cell">
                                {new Date(support.timestamps.returned).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <div className="report-actions">
                    <button className="btn btn-primary btn-lg" onClick={onNewSupport}>
                        ➕ Nuevo Soporte
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupportReport;
