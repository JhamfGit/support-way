import { useState, useEffect } from 'react';
import TechnicianView from './components/TechnicianView';
import AdminView from './components/AdminView';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('technician');
  const [supports, setSupports] = useState([]);
  const [theme, setTheme] = useState(() => {
    // Obtener tema guardado o usar 'light' por defecto
    return localStorage.getItem('support-way-theme') || 'light';
  });

  // Aplicar tema al documento
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('support-way-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const addSupport = (support) => {
    setSupports([...supports, { ...support, id: Date.now() }]);
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
