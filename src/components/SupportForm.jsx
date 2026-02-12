import { useState } from 'react';
import './SupportForm.css';

const SupportForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        technician: '',
        client: '',
        supportType: '',
        scheduledTime: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.technician && formData.client && formData.supportType) {
            onSubmit(formData);
        }
    };

    return (
        <div className="support-form-container">
            <form className="support-form card" onSubmit={handleSubmit}>
                <div className="card-header">
                    <h3 className="card-title">📌 Asignación de Soporte</h3>
                </div>

                <div className="card-body">
                    <div className="form-group">
                        <label className="form-label" htmlFor="technician">
                            Técnico Asignado *
                        </label>
                        <input
                            type="text"
                            id="technician"
                            name="technician"
                            className="form-input"
                            placeholder="Nombre del técnico"
                            value={formData.technician}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="client">
                            Cliente / Sitio *
                        </label>
                        <input
                            type="text"
                            id="client"
                            name="client"
                            className="form-input"
                            placeholder="Nombre del cliente o sitio"
                            value={formData.client}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="supportType">
                            Tipo de Soporte *
                        </label>
                        <select
                            id="supportType"
                            name="supportType"
                            className="form-select"
                            value={formData.supportType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="Instalación">Instalación</option>
                            <option value="Mantenimiento">Mantenimiento</option>
                            <option value="Reparación">Reparación</option>
                            <option value="Consultoría">Consultoría</option>
                            <option value="Emergencia">Emergencia</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="scheduledTime">
                            Hora Programada
                        </label>
                        <input
                            type="time"
                            id="scheduledTime"
                            name="scheduledTime"
                            className="form-input"
                            value={formData.scheduledTime}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                        Iniciar Soporte
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SupportForm;
