import { useState, useEffect } from 'react';
import './SupportTracker.css';

const TRANSPORT_OPTIONS = [
    { value: 'moto', label: 'Moto', icon: '🏍️' },
    { value: 'carro', label: 'Carro', icon: '🚗' },
    { value: 'publico', label: 'Transporte Público', icon: '🚌' },
    { value: 'caminando', label: 'Caminando', icon: '🚶' },
];

const SupportTracker = ({ support, onComplete }) => {
    const [status, setStatus] = useState('assigned');
    const [transport, setTransport] = useState('');
    const [showTransportModal, setShowTransportModal] = useState(false);
    const [timestamps, setTimestamps] = useState({
        assigned: new Date().toISOString(),
    });
    const [elapsedTime, setElapsedTime] = useState(0);

    // Cronómetro en tiempo real
    useEffect(() => {
        const interval = setInterval(() => {
            const start = new Date(timestamps.assigned);
            const now = new Date();
            setElapsedTime(Math.floor((now - start) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [timestamps.assigned]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleDeparture = () => {
        setShowTransportModal(true);
    };

    const handleTransportSelect = (transportType) => {
        setTransport(transportType);
        setTimestamps({ ...timestamps, departed: new Date().toISOString() });
        setStatus('traveling_to_site');
        setShowTransportModal(false);
    };

    const handleArrival = () => {
        setTimestamps({ ...timestamps, arrived: new Date().toISOString() });
        setStatus('on_site');
    };

    const handleFinishWork = () => {
        setTimestamps({ ...timestamps, finished: new Date().toISOString() });
        setStatus('returning');
    };

    const handleReturnToOffice = () => {
        const finalTimestamps = { ...timestamps, returned: new Date().toISOString() };
        setTimestamps(finalTimestamps);
        setStatus('completed');

        // Calcular tiempos
        const times = calculateTimes(finalTimestamps);

        onComplete({
            ...support,
            transport,
            timestamps: finalTimestamps,
            times,
            status: 'completed',
        });
    };

    const calculateTimes = (ts) => {
        const travelToSite = ts.departed && ts.arrived
            ? Math.floor((new Date(ts.arrived) - new Date(ts.departed)) / 1000)
            : 0;

        const timeOnSite = ts.arrived && ts.finished
            ? Math.floor((new Date(ts.finished) - new Date(ts.arrived)) / 1000)
            : 0;

        const travelReturn = ts.finished && ts.returned
            ? Math.floor((new Date(ts.returned) - new Date(ts.finished)) / 1000)
            : 0;

        const totalTime = ts.departed && ts.returned
            ? Math.floor((new Date(ts.returned) - new Date(ts.departed)) / 1000)
            : 0;

        return { travelToSite, timeOnSite, travelReturn, totalTime };
    };

    const getStatusInfo = () => {
        switch (status) {
            case 'assigned':
                return {
                    icon: '📋',
                    label: 'Asignado',
                    color: 'info',
                    description: 'Soporte asignado, listo para salir',
                };
            case 'traveling_to_site':
                return {
                    icon: '🚗',
                    label: 'En camino al sitio',
                    color: 'warning',
                    description: 'Técnico viajando hacia el cliente',
                };
            case 'on_site':
                return {
                    icon: '🟢',
                    label: 'En sitio',
                    color: 'success',
                    description: 'Técnico trabajando en el sitio',
                };
            case 'returning':
                return {
                    icon: '🚙',
                    label: 'Regresando a oficina',
                    color: 'warning',
                    description: 'Soporte finalizado, regresando',
                };
            default:
                return {
                    icon: '✅',
                    label: 'Completado',
                    color: 'success',
                    description: 'Soporte completado exitosamente',
                };
        }
    };

    const statusInfo = getStatusInfo();

    return (
        <div className="support-tracker animate-fade-in">
            <div className="tracker-container">
                {/* Header con información del soporte */}
                <div className="tracker-header card">
                    <div className="support-info">
                        <h2>🛠️ Soporte en Progreso</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Técnico:</span>
                                <span className="info-value">{support.technician}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Cliente:</span>
                                <span className="info-value">{support.client}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Tipo:</span>
                                <span className="info-value">{support.supportType}</span>
                            </div>
                            {transport && (
                                <div className="info-item">
                                    <span className="info-label">Transporte:</span>
                                    <span className="info-value">
                                        {TRANSPORT_OPTIONS.find(t => t.value === transport)?.icon}{' '}
                                        {TRANSPORT_OPTIONS.find(t => t.value === transport)?.label}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cronómetro */}
                <div className="timer-card card">
                    <div className="timer-display">
                        <div className="timer-icon">⏱️</div>
                        <div className="timer-time">{formatTime(elapsedTime)}</div>
                        <div className="timer-label">Tiempo Total Transcurrido</div>
                    </div>
                </div>

                {/* Estado actual */}
                <div className={`status-card card status-${statusInfo.color}`}>
                    <div className="status-icon">{statusInfo.icon}</div>
                    <div className="status-content">
                        <h3 className="status-label">{statusInfo.label}</h3>
                        <p className="status-description">{statusInfo.description}</p>
                    </div>
                </div>

                {/* Timeline visual */}
                <div className="timeline-card card">
                    <h3 className="timeline-title">Línea de Tiempo</h3>
                    <div className="timeline">
                        <div className={`timeline-item ${timestamps.assigned ? 'completed' : ''}`}>
                            <div className="timeline-marker">📌</div>
                            <div className="timeline-content">
                                <div className="timeline-label">Asignado</div>
                                {timestamps.assigned && (
                                    <div className="timeline-time">
                                        {new Date(timestamps.assigned).toLocaleTimeString()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`timeline-item ${timestamps.departed ? 'completed' : status === 'assigned' ? 'active' : ''}`}>
                            <div className="timeline-marker">🚗</div>
                            <div className="timeline-content">
                                <div className="timeline-label">Salida hacia soporte</div>
                                {timestamps.departed && (
                                    <div className="timeline-time">
                                        {new Date(timestamps.departed).toLocaleTimeString()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`timeline-item ${timestamps.arrived ? 'completed' : status === 'traveling_to_site' ? 'active' : ''}`}>
                            <div className="timeline-marker">📍</div>
                            <div className="timeline-content">
                                <div className="timeline-label">Llegada al sitio</div>
                                {timestamps.arrived && (
                                    <div className="timeline-time">
                                        {new Date(timestamps.arrived).toLocaleTimeString()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`timeline-item ${timestamps.finished ? 'completed' : status === 'on_site' ? 'active' : ''}`}>
                            <div className="timeline-marker">✅</div>
                            <div className="timeline-content">
                                <div className="timeline-label">Finalización del soporte</div>
                                {timestamps.finished && (
                                    <div className="timeline-time">
                                        {new Date(timestamps.finished).toLocaleTimeString()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`timeline-item ${timestamps.returned ? 'completed' : status === 'returning' ? 'active' : ''}`}>
                            <div className="timeline-marker">🏢</div>
                            <div className="timeline-content">
                                <div className="timeline-label">Llegada a oficina</div>
                                {timestamps.returned && (
                                    <div className="timeline-time">
                                        {new Date(timestamps.returned).toLocaleTimeString()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="actions-card card">
                    {status === 'assigned' && (
                        <button className="btn btn-primary btn-lg" onClick={handleDeparture}>
                            🚗 Salir hacia soporte
                        </button>
                    )}

                    {status === 'traveling_to_site' && (
                        <button className="btn btn-success btn-lg" onClick={handleArrival}>
                            📍 Llegué al sitio
                        </button>
                    )}

                    {status === 'on_site' && (
                        <button className="btn btn-warning btn-lg" onClick={handleFinishWork}>
                            ✅ Finalizar soporte
                        </button>
                    )}

                    {status === 'returning' && (
                        <button className="btn btn-primary btn-lg" onClick={handleReturnToOffice}>
                            🏢 Llegué a oficina
                        </button>
                    )}
                </div>
            </div>

            {/* Modal de selección de transporte */}
            {showTransportModal && (
                <div className="modal-overlay" onClick={() => setShowTransportModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Seleccionar Medio de Transporte</h3>
                        <div className="transport-options">
                            {TRANSPORT_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    className="transport-option"
                                    onClick={() => handleTransportSelect(option.value)}
                                >
                                    <span className="transport-icon">{option.icon}</span>
                                    <span className="transport-label">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupportTracker;
