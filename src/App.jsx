import { useState, useEffect } from 'react';
import TechnicianView from './components/TechnicianView';
import AdminView from './components/AdminView';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('technician');
  const [supports, setSupports] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('support-way-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('support-way-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    fetchSupports();
  }, []);

  const fetchSupports = async () => {
    try {
      const response = await fetch(`${API_URL}/supports`);
      const data = await response.json();
      setSupports(data);
    } catch (error) {
      console.error('Error fetching supports:', error);
    }
  };

  const addSupport = async (support) => {
    try {
      const response = await fetch(`${API_URL}/supports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          technician_name: support.technician,
          client_name: support.client,
          support_type: support.supportType,
          scheduled_time: support.scheduledTime,
          assigned_at: new Date().toISOString()
        })
      });
      if (response.ok) {
        fetchSupports();
      }
    } catch (error) {
      console.error('Error adding support:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">⚡</div>
              <div>
                <h1 className="app-title">Support Way</h1>
                <p className="app-subtitle">Gestión de Tiempos de Soporte</p>
              </div>
            </div>
            <div className="theme-toggle">
              <nav className="nav-tabs">
                <button
                  className={`nav-tab ${currentView === 'technician' ? 'active' : ''}`}
                  onClick={() => setCurrentView('technician')}
                >
                  <span className="tab-icon">👨‍🔧</span>
                  Técnico
                </button>
                <button
                  className={`nav-tab ${currentView === 'admin' ? 'active' : ''}`}
                  onClick={() => setCurrentView('admin')}
                >
                  <span className="tab-icon">📊</span>
                  Administrador
                </button>
              </nav>
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'technician' ? (
          <TechnicianView onSupportComplete={addSupport} />
        ) : (
          <AdminView supports={supports} />
        )}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>© 2026 Support Way - Jhamf Group S.A.S</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
