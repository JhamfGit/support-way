import { useState, useEffect } from 'react';
import SupportForm from './SupportForm';
import SupportTracker from './SupportTracker';
import SupportReport from './SupportReport';
import './TechnicianView.css';

const TechnicianView = ({ onSupportComplete }) => {
    const [currentSupport, setCurrentSupport] = useState(null);
    const [completedSupport, setCompletedSupport] = useState(null);

    const handleStartSupport = (supportData) => {
        setCurrentSupport({
            ...supportData,
            status: 'assigned',
            assignedAt: new Date().toISOString(),
        });
        setCompletedSupport(null);
    };

    const handleCompleteSupport = (finalSupport) => {
        setCompletedSupport(finalSupport);
        onSupportComplete(finalSupport);
        setCurrentSupport(null);
    };

    const handleNewSupport = () => {
        setCompletedSupport(null);
    };

    return (
        <div className="technician-view">
            <div className="container">
                {!currentSupport && !completedSupport && (
                    <div className="welcome-section animate-fade-in">
                        <div className="welcome-card">
                            <div className="welcome-icon">🚀</div>
                            <h2>Bienvenido, Técnico</h2>
                            <p>Inicia un nuevo soporte técnico completando el formulario</p>
                        </div>
                        <SupportForm onSubmit={handleStartSupport} />
                    </div>
                )}

                {currentSupport && (
                    <SupportTracker
                        support={currentSupport}
                        onComplete={handleCompleteSupport}
                    />
                )}

                {completedSupport && (
                    <SupportReport
                        support={completedSupport}
                        onNewSupport={handleNewSupport}
                    />
                )}
            </div>
        </div>
    );
};

export default TechnicianView;
