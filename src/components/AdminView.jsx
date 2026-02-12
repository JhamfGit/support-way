import { useState, useMemo } from 'react';
import './AdminView.css';

const AdminView = ({ supports }) => {
    const [filters, setFilters] = useState({
        technician: '',
        client: '',
        dateFrom: '',
        dateTo: '',
    });

    // Generar datos de demostración si no hay soportes
    const demoSupports = useMemo(() => {
        if (supports.length > 0) return [];

        const technicians = ['Carlos Méndez', 'Ana García', 'Luis Rodríguez', 'María Torres'];
        const clients = ['TechCorp', 'InnovaLab', 'DataSystems', 'CloudNet', 'SmartSolutions'];
        const types = ['Instalación', 'Mantenimiento', 'Reparación', 'Consultoría'];
        const transports = ['moto', 'carro', 'publico', 'caminando'];

        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));

            const travelToSite = 900 + Math.floor(Math.random() * 1800); // 15-45 min
            const timeOnSite = 1800 + Math.floor(Math.random() * 5400); // 30-120 min
            const travelReturn = 900 + Math.floor(Math.random() * 1800); // 15-45 min

            return {
                id: i + 1,
                technician: technicians[Math.floor(Math.random() * technicians.length)],
                client: clients[Math.floor(Math.random() * clients.length)],
                supportType: types[Math.floor(Math.random() * types.length)],
                transport: transports[Math.floor(Math.random() * transports.length)],
                timestamps: {
                    assigned: date.toISOString(),
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
    }, [supports]);

    const allSupports = supports.length > 0 ? supports : demoSupports;

    // Filtrar soportes
    const filteredSupports = useMemo(() => {
        return allSupports.filter((support) => {
            if (filters.technician && !support.technician.toLowerCase().includes(filters.technician.toLowerCase())) {
                return false;
            }
            if (filters.client && !support.client.toLowerCase().includes(filters.client.toLowerCase())) {
                return false;
            }
            if (filters.dateFrom) {
                const supportDate = new Date(support.timestamps.assigned).toISOString().split('T')[0];
                if (supportDate < filters.dateFrom) return false;
            }
            if (filters.dateTo) {
                const supportDate = new Date(support.timestamps.assigned).toISOString().split('T')[0];
                if (supportDate > filters.dateTo) return false;
            }
            return true;
        });
    }, [allSupports, filters]);

    // Calcular métricas
    const metrics = useMemo(() => {
        if (filteredSupports.length === 0) {
            return {
                totalSupports: 0,
                avgTotalTime: 0,
                avgTravelTime: 0,
                avgWorkTime: 0,
                mostEfficientTech: '-',
                technicianStats: [],
            };
        }

        const totalTime = filteredSupports.reduce((sum, s) => sum + (s.times?.totalTime || 0), 0);
        const totalTravel = filteredSupports.reduce(
            (sum, s) => sum + (s.times?.travelToSite || 0) + (s.times?.travelReturn || 0),
            0
        );
        const totalWork = filteredSupports.reduce((sum, s) => sum + (s.times?.timeOnSite || 0), 0);

        // Estadísticas por técnico
        const techStats = {};
        filteredSupports.forEach((support) => {
            if (!techStats[support.technician]) {
                techStats[support.technician] = {
                    name: support.technician,
                    count: 0,
                    totalTime: 0,
                    avgTime: 0,
                };
            }
            techStats[support.technician].count++;
            techStats[support.technician].totalTime += support.times?.totalTime || 0;
        });

        const technicianStats = Object.values(techStats).map((tech) => ({
            ...tech,
            avgTime: tech.totalTime / tech.count,
        }));

        technicianStats.sort((a, b) => a.avgTime - b.avgTime);

        return {
            totalSupports: filteredSupports.length,
            avgTotalTime: totalTime / filteredSupports.length,
            avgTravelTime: totalTravel / filteredSupports.length,
            avgWorkTime: totalWork / filteredSupports.length,
            mostEfficientTech: technicianStats[0]?.name || '-',
            technicianStats,
        };
    }, [filteredSupports]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);

        if (hrs > 0) {
            return `${hrs}h ${mins}m`;
        } else {
            return `${mins}m`;
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const clearFilters = () => {
        setFilters({
            technician: '',
            client: '',
            dateFrom: '',
            dateTo: '',
        });
    };

    return (
        <div className="admin-view">
            <div className="container">
                {supports.length === 0 && (
                    <div className="demo-banner">
                        <span className="demo-icon">🎭</span>
                        <span>Mostrando datos de demostración - Los soportes reales aparecerán aquí</span>
                    </div>
                )}

                {/* Métricas principales */}
                <div className="metrics-section">
                    <h2 className="section-title">📊 Métricas Generales</h2>
                    <div className="metrics-grid">
                        <div className="metric-card metric-primary">
                            <div className="metric-icon">📋</div>
                            <div className="metric-value">{metrics.totalSupports}</div>
                            <div className="metric-label">Soportes Totales</div>
                        </div>
                        <div className="metric-card metric-success">
                            <div className="metric-icon">⏱️</div>
                            <div className="metric-value">{formatTime(metrics.avgTotalTime)}</div>
                            <div className="metric-label">Tiempo Promedio Total</div>
                        </div>
                        <div className="metric-card metric-warning">
                            <div className="metric-icon">🚗</div>
                            <div className="metric-value">{formatTime(metrics.avgTravelTime)}</div>
                            <div className="metric-label">Tiempo Promedio Desplazamiento</div>
                        </div>
                        <div className="metric-card metric-info">
                            <div className="metric-icon">🏆</div>
                            <div className="metric-value-text">{metrics.mostEfficientTech}</div>
                            <div className="metric-label">Técnico Más Eficiente</div>
                        </div>
                    </div>
                </div>

                {/* Filtros */}
                <div className="filters-section card">
                    <div className="filters-header">
                        <h3 className="section-title">🔍 Filtros</h3>
                        <button className="btn btn-sm btn-outline" onClick={clearFilters}>
                            Limpiar Filtros
                        </button>
                    </div>
                    <div className="filters-grid">
                        <div className="form-group">
                            <label className="form-label" htmlFor="technician">
                                Técnico
                            </label>
                            <input
                                type="text"
                                id="technician"
                                name="technician"
                                className="form-input"
                                placeholder="Buscar por técnico"
                                value={filters.technician}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="client">
                                Cliente
                            </label>
                            <input
                                type="text"
                                id="client"
                                name="client"
                                className="form-input"
                                placeholder="Buscar por cliente"
                                value={filters.client}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="dateFrom">
                                Desde
                            </label>
                            <input
                                type="date"
                                id="dateFrom"
                                name="dateFrom"
                                className="form-input"
                                value={filters.dateFrom}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="dateTo">
                                Hasta
                            </label>
                            <input
                                type="date"
                                id="dateTo"
                                name="dateTo"
                                className="form-input"
                                value={filters.dateTo}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Comparativa de técnicos */}
                {metrics.technicianStats.length > 0 && (
                    <div className="technician-comparison card">
                        <h3 className="section-title">👥 Comparativa de Técnicos</h3>
                        <div className="comparison-chart">
                            {metrics.technicianStats.map((tech, index) => {
                                const maxAvgTime = Math.max(...metrics.technicianStats.map((t) => t.avgTime));
                                const barWidth = (tech.avgTime / maxAvgTime) * 100;

                                return (
                                    <div key={tech.name} className="comparison-row">
                                        <div className="comparison-rank">#{index + 1}</div>
                                        <div className="comparison-info">
                                            <div className="comparison-name">{tech.name}</div>
                                            <div className="comparison-stats">
                                                {tech.count} soportes · Promedio: {formatTime(tech.avgTime)}
                                            </div>
                                        </div>
                                        <div className="comparison-bar-container">
                                            <div
                                                className={`comparison-bar ${index === 0 ? 'bar-best' : ''}`}
                                                style={{ width: `${barWidth}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Lista de soportes */}
                <div className="supports-list card">
                    <h3 className="section-title">📝 Historial de Soportes</h3>
                    {filteredSupports.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📭</div>
                            <p>No se encontraron soportes con los filtros aplicados</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="supports-table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Técnico</th>
                                        <th>Cliente</th>
                                        <th>Tipo</th>
                                        <th>Transporte</th>
                                        <th>Tiempo Total</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSupports.map((support) => (
                                        <tr key={support.id}>
                                            <td>{new Date(support.timestamps.assigned).toLocaleDateString()}</td>
                                            <td>{support.technician}</td>
                                            <td>{support.client}</td>
                                            <td>{support.supportType}</td>
                                            <td>
                                                {support.transport === 'moto' && '🏍️ Moto'}
                                                {support.transport === 'carro' && '🚗 Carro'}
                                                {support.transport === 'publico' && '🚌 Público'}
                                                {support.transport === 'caminando' && '🚶 Caminando'}
                                            </td>
                                            <td>{formatTime(support.times?.totalTime || 0)}</td>
                                            <td>
                                                <span className="badge badge-success">✅ Completado</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminView;
