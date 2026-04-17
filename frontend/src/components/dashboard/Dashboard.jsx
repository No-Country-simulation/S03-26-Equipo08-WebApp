import * as React from 'react';
import { NavLink, useNavigate } from 'react-router';

const NAV_ITEMS = [
  {
    to: '/dashboard',
    end: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    label: 'Dashboard',
  },
  {
    to: 'nuevoTestimonio',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    ),
    label: 'Nuevo Testimonio',
  },
  {
    to: 'testimonios',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    label: 'Testimonios',
  },
  {
    to: 'moderación',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
      </svg>
    ),
    label: 'Moderación',
  },
  {
    to: 'categorias',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h10M4 18h7"/>
      </svg>
    ),
    label: 'Categorías',
  },
  {
    to: 'embeds',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: 'Embeds',
  },
  {
    to: 'apiDocumento',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
    label: 'API Docs',
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #18122B;
    --bg-soft: #231942;
    --text: #E9E4F0;
    --text-muted: #A78BFA;
    --hover: #2E1F5B;
    --active: #3B2C6D;
    --primary: #C084FC;
    --accent: #F472B6;
    --border: rgba(255,255,255,0.08);
  }

  .sidebar {
    width: 240px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border);
    font-family: 'DM Sans', sans-serif;
    z-index: 100;
  }

  .sidebar-logo {
    padding: 28px 20px 20px;
    border-bottom: 1px solid var(--border);
  }

  .sidebar-logo-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .sidebar-logo-dot {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar-logo-dot svg {
    width: 14px;
    height: 14px;
    color: white;
  }

  .sidebar-logo-text {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
  }

  .sidebar-logo-sub {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .sidebar-nav {
    flex: 1;
    padding: 16px 12px;
    overflow-y: auto;
  }

  .nav-section-label {
    font-size: 10px;
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0 8px;
    margin: 8px 0 6px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 8px;
    font-size: 13.5px;
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.15s ease;
    margin-bottom: 2px;
    cursor: pointer;
  }

  .nav-item:hover {
    background: var(--hover);
    color: var(--text);
  }

  .nav-item.active {
    background: var(--active);
    color: var(--primary);
  }

  .nav-item.active .nav-icon {
    color: var(--accent);
  }

  .nav-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: inherit;
  }

  .sidebar-footer {
    padding: 16px 12px;
    border-top: 1px solid var(--border);
  }

  .user-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s;
    position: relative;
  }

  .user-card:hover {
    background: var(--hover);
  }

  .user-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    border: 1.5px solid var(--primary);
  }

  .user-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
  }

  .user-role {
    font-size: 11px;
    color: var(--text-muted);
  }

  .user-chevron {
    color: var(--text-muted);
    transition: transform 0.2s;
  }

  .user-chevron.open {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    bottom: 56px;
    left: 10px;
    right: 10px;
    background: var(--bg-soft);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 -8px 24px rgba(0,0,0,0.4);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: var(--text-muted);
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
  }

  .dropdown-item:hover {
    background: var(--hover);
    color: var(--text);
  }

  .dropdown-item.danger {
    color: #f87171;
  }

  .dropdown-divider {
    height: 1px;
    background: var(--border);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4ade80;
  }
`;

export function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <style>{styles}</style>
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-badge">
            <div className="sidebar-logo-dot">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div>
              <div className="sidebar-logo-text">TestimonialHub</div>
              <div className="sidebar-logo-sub">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">General</div>
          {NAV_ITEMS.slice(0, 1).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <div className="nav-section-label" style={{ marginTop: 16 }}>Testimonios</div>
          {NAV_ITEMS.slice(1, 4).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <div className="nav-section-label" style={{ marginTop: 16 }}>Configuración</div>
          {NAV_ITEMS.slice(4).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer / User */}
        <div className="sidebar-footer">
          {open && (
            <div className="dropdown">
              <button className="dropdown-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                Tu perfil
              </button>
              <button className="dropdown-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
                Configuración
              </button>
              <div className="dropdown-divider"/>
              <button className="dropdown-item danger" onClick={handleLogout}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Cerrar sesión
              </button>
            </div>
          )}

          <div className="user-card" onClick={() => setOpen(!open)}>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
              className="user-avatar"
              alt="user"
            />
            <div className="user-info">
              <div className="user-name">Usuario</div>
              <div className="user-role" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="status-dot" />
                Admin
              </div>
            </div>
            <svg
              className={`user-chevron${open ? ' open' : ''}`}
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Dashboard;
